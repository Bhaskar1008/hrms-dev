import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, authorize } from '../middleware/auth.js';
import Leave from '../models/Leave.js';
import LeaveBalance from '../models/LeaveBalance.js';

const router = express.Router();

// Validation middleware
const leaveValidation = [
  body('type').isIn(['casual', 'sick', 'privilege', 'unpaid']),
  body('startDate').isISO8601().toDate(),
  body('endDate').isISO8601().toDate(),
  body('reason').notEmpty().trim(),
];

// Get leave balance for current user
router.get('/balance', auth, async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    let balance = await LeaveBalance.findOne({
      employeeId: req.user._id,
      year: currentYear,
    });
    
    if (!balance) {
      balance = new LeaveBalance({
        employeeId: req.user._id,
        year: currentYear,
      });
      await balance.save();
    }
    
    res.json(balance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaves for current user
router.get('/me', auth, async (req, res) => {
  try {
    const { status, year } = req.query;
    const query = { employeeId: req.user._id };
    
    if (status) query.status = status;
    if (year) {
      const startDate = new Date(parseInt(year), 0, 1);
      const endDate = new Date(parseInt(year), 11, 31);
      query.startDate = { $gte: startDate, $lte: endDate };
    }
    
    const leaves = await Leave.find(query)
      .populate('approvedBy', 'name employeeId')
      .sort({ startDate: -1 });
      
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all leaves (HR & Admin only)
router.get('/all', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const { status, employeeId, startDate, endDate } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (employeeId) query.employeeId = employeeId;
    if (startDate && endDate) {
      query.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    
    const leaves = await Leave.find(query)
      .populate('employeeId', 'name employeeId department')
      .populate('approvedBy', 'name employeeId')
      .sort({ startDate: -1 });
      
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply for leave
router.post('/apply', auth, leaveValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { type, startDate, endDate, reason, attachments } = req.body;
    
    // Check for overlapping leaves
    const overlapping = await Leave.findOne({
      employeeId: req.user._id,
      status: { $in: ['pending', 'approved'] },
      $or: [
        {
          startDate: { $lte: startDate },
          endDate: { $gte: startDate },
        },
        {
          startDate: { $lte: endDate },
          endDate: { $gte: endDate },
        },
      ],
    });
    
    if (overlapping) {
      return res.status(400).json({ message: 'Leave dates overlap with existing leave' });
    }
    
    // Check leave balance
    const currentYear = new Date().getFullYear();
    let balance = await LeaveBalance.findOne({
      employeeId: req.user._id,
      year: currentYear,
    });
    
    if (!balance) {
      balance = new LeaveBalance({
        employeeId: req.user._id,
        year: currentYear,
      });
    }
    
    const leave = new Leave({
      employeeId: req.user._id,
      type,
      startDate,
      endDate,
      reason,
      attachments,
    });
    
    // Calculate days and check balance
    leave.calculateDays();
    if (!balance.canApplyLeave(type, leave.days)) {
      return res.status(400).json({ message: 'Insufficient leave balance' });
    }
    
    // Update balance and save
    balance.updateBalance(type, leave.days, 'apply');
    await balance.save();
    await leave.save();
    
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Reject leave (HR, Admin & Manager only)
router.patch('/:id/status', auth, authorize('admin', 'hr', 'manager'), async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    
    if (leave.status !== 'pending') {
      return res.status(400).json({ message: 'Leave is not pending' });
    }
    
    // Update leave status
    leave.status = status;
    leave.approvedBy = req.user._id;
    if (status === 'rejected') {
      leave.rejectionReason = rejectionReason;
    }
    
    // Update leave balance
    const balance = await LeaveBalance.findOne({
      employeeId: leave.employeeId,
      year: new Date(leave.startDate).getFullYear(),
    });
    
    if (balance) {
      balance.updateBalance(leave.type, leave.days, status);
      await balance.save();
    }
    
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel leave
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const leave = await Leave.findOne({
      _id: req.params.id,
      employeeId: req.user._id,
    });
    
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    
    if (!['pending', 'approved'].includes(leave.status)) {
      return res.status(400).json({ message: 'Leave cannot be cancelled' });
    }
    
    const { cancellationReason } = req.body;
    
    // Update leave status
    leave.status = 'cancelled';
    leave.cancellationReason = cancellationReason;
    leave.cancelledAt = new Date();
    
    // Update leave balance
    const balance = await LeaveBalance.findOne({
      employeeId: leave.employeeId,
      year: new Date(leave.startDate).getFullYear(),
    });
    
    if (balance) {
      balance.updateBalance(leave.type, leave.days, 'cancel');
      await balance.save();
    }
    
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;