import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, authorize } from '../middleware/auth.js';
import Payroll from '../models/Payroll.js';
import SalaryStructure from '../models/SalaryStructure.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Validation middleware
const salaryStructureValidation = [
  body('basic').isFloat({ min: 0 }),
  body('hra').isFloat({ min: 0 }),
  body('effectiveFrom').isISO8601().toDate(),
];

const payrollValidation = [
  body('month').isInt({ min: 1, max: 12 }),
  body('year').isInt({ min: 2000 }),
];

// Get salary structure for current user
router.get('/structure/me', auth, async (req, res) => {
  try {
    const structure = await SalaryStructure.findOne({
      employeeId: req.user._id,
      status: 'active',
    }).sort({ effectiveFrom: -1 });
    
    res.json(structure);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all salary structures (HR & Admin only)
router.get('/structure/all', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const { employeeId } = req.query;
    const query = employeeId ? { employeeId } : {};
    
    const structures = await SalaryStructure.find(query)
      .populate('employeeId', 'name employeeId department')
      .sort({ effectiveFrom: -1 });
      
    res.json(structures);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create/Update salary structure (HR & Admin only)
router.post('/structure', auth, authorize('admin', 'hr'), salaryStructureValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { employeeId, effectiveFrom, ...structureData } = req.body;
    
    // Deactivate current active structure if exists
    await SalaryStructure.updateMany(
      { employeeId, status: 'active' },
      { status: 'inactive' }
    );
    
    // Create new structure
    const structure = new SalaryStructure({
      employeeId,
      effectiveFrom,
      ...structureData,
    });
    
    await structure.save();
    res.status(201).json(structure);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get payslips for current user
router.get('/me', auth, async (req, res) => {
  try {
    const { year } = req.query;
    const query = { employeeId: req.user._id };
    
    if (year) query.year = parseInt(year);
    
    const payslips = await Payroll.find(query).sort({ year: -1, month: -1 });
    res.json(payslips);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all payslips (HR & Admin only)
router.get('/all', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const { month, year, status, employeeId } = req.query;
    const query = {};
    
    if (month) query.month = parseInt(month);
    if (year) query.year = parseInt(year);
    if (status) query.status = status;
    if (employeeId) query.employeeId = employeeId;
    
    const payslips = await Payroll.find(query)
      .populate('employeeId', 'name employeeId department')
      .populate('paidBy', 'name employeeId')
      .sort({ year: -1, month: -1 });
      
    res.json(payslips);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate payroll (HR & Admin only)
router.post('/generate', auth, authorize('admin', 'hr'), payrollValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { month, year, employeeIds } = req.body;
    
    // Get start and end date for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    // Process payroll for each employee
    const results = await Promise.all(employeeIds.map(async (employeeId) => {
      try {
        // Get salary structure
        const structure = await SalaryStructure.findOne({
          employeeId,
          status: 'active',
          effectiveFrom: { $lte: endDate },
        }).sort({ effectiveFrom: -1 });
        
        if (!structure) {
          return { employeeId, error: 'No active salary structure found' };
        }
        
        // Calculate attendance and overtime
        const attendance = await Attendance.find({
          employeeId,
          date: { $gte: startDate, $lte: endDate },
        });
        
        const overtime = attendance.reduce((total, record) => total + (record.overtime || 0), 0);
        
        // Calculate deductions
        const deductions = {
          pf: structure.deductions.pf.enabled ? (structure.basic * structure.deductions.pf.percentage / 100) : 0,
          professionalTax: structure.deductions.professionalTax.enabled ? structure.deductions.professionalTax.amount : 0,
          incomeTax: 0, // To be calculated based on tax slab
          other: 0,
        };
        
        // Create payroll entry
        const payroll = new Payroll({
          employeeId,
          month,
          year,
          basic: structure.basic,
          hra: structure.hra,
          allowances: structure.allowances,
          deductions,
          overtime: {
            hours: overtime,
            rate: structure.overtimeRate,
          },
          status: 'processed',
        });
        
        await payroll.save();
        return { employeeId, success: true, payroll };
      } catch (error) {
        return { employeeId, error: error.message };
      }
    }));
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Process payment (HR & Admin only)
router.patch('/:id/pay', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }
    
    if (payroll.status === 'paid') {
      return res.status(400).json({ message: 'Payroll already paid' });
    }
    
    payroll.status = 'paid';
    payroll.paidOn = new Date();
    payroll.paidBy = req.user._id;
    
    await payroll.save();
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;