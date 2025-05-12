import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, authorize } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Validation middleware
const employeeValidation = [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('department').notEmpty(),
  body('designation').notEmpty(),
  body('phoneNumber').optional().isMobilePhone('any'),
];

// Get all employees (HR & Admin only)
router.get('/', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const { department, status, search } = req.query;
    const query = {};
    
    if (department) query.department = department;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
      ];
    }
    
    const employees = await User.find(query)
      .select('-password')
      .populate('reportingTo', 'name employeeId');
      
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const employee = await User.findById(req.params.id)
      .select('-password')
      .populate('reportingTo', 'name employeeId');
      
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Only allow HR, Admin, or the employee themselves to view details
    if (!['admin', 'hr'].includes(req.user.role) && req.user._id.toString() !== employee._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update employee (HR & Admin only)
router.patch('/:id', auth, authorize('admin', 'hr'), employeeValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {
      name,
      email,
      department,
      designation,
      status,
      reportingTo,
      phoneNumber,
      address,
      emergencyContact,
    } = req.body;
    
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Update fields
    Object.assign(employee, {
      name,
      email,
      department,
      designation,
      status,
      reportingTo,
      phoneNumber,
      address,
      emergencyContact,
    });
    
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload employee document (HR & Admin only)
router.post('/:id/documents', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const { name, type, url } = req.body;
    
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    employee.documents.push({
      name,
      type,
      url,
      uploadedAt: new Date(),
    });
    
    await employee.save();
    res.json(employee.documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete employee document (HR & Admin only)
router.delete('/:id/documents/:documentId', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    employee.documents = employee.documents.filter(
      doc => doc._id.toString() !== req.params.documentId
    );
    
    await employee.save();
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee statistics (HR & Admin only)
router.get('/stats/overview', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] },
          },
          onboarding: {
            $sum: { $cond: [{ $eq: ['$status', 'onboarding'] }, 1, 0] },
          },
          departments: { $addToSet: '$department' },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          active: 1,
          onboarding: 1,
          departmentCount: { $size: '$departments' },
        },
      },
    ]);
    
    res.json(stats[0] || {
      total: 0,
      active: 0,
      onboarding: 0,
      departmentCount: 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;