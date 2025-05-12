import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, authorize } from '../middleware/auth.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Validation middleware
const attendanceValidation = [
  body('date').isISO8601().toDate(),
  body('status').isIn(['present', 'absent', 'late', 'half-day', 'weekend', 'holiday']),
];

// Get attendance for current user
router.get('/me', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { employeeId: req.user._id };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    
    const attendance = await Attendance.find(query).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance for all employees (HR & Admin only)
router.get('/all', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const { startDate, endDate, employeeId, status } = req.query;
    const query = {};
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    
    if (employeeId) query.employeeId = employeeId;
    if (status) query.status = status;
    
    const attendance = await Attendance.find(query)
      .populate('employeeId', 'name employeeId department')
      .sort({ date: -1 });
      
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Record check-in
router.post('/check-in', auth, async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Check if attendance already exists for today
    let attendance = await Attendance.findOne({
      employeeId: req.user._id,
      date: today,
    });
    
    if (attendance?.checkIn) {
      return res.status(400).json({ message: 'Already checked in for today' });
    }
    
    // Create or update attendance record
    if (!attendance) {
      attendance = new Attendance({
        employeeId: req.user._id,
        date: today,
        status: now.getHours() >= 10 ? 'late' : 'present', // Mark late if after 10 AM
      });
    }
    
    attendance.checkIn = {
      time: now,
      location: req.body.location || 'Office',
      method: req.body.method || 'biometric',
    };
    
    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Record check-out
router.post('/check-out', auth, async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Find today's attendance record
    const attendance = await Attendance.findOne({
      employeeId: req.user._id,
      date: today,
    });
    
    if (!attendance) {
      return res.status(404).json({ message: 'No check-in record found for today' });
    }
    
    if (attendance.checkOut) {
      return res.status(400).json({ message: 'Already checked out for today' });
    }
    
    attendance.checkOut = {
      time: now,
      location: req.body.location || 'Office',
      method: req.body.method || 'biometric',
    };
    
    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Manual attendance entry (HR & Admin only)
router.post('/manual', auth, authorize('admin', 'hr'), attendanceValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { employeeId, date, status, checkIn, checkOut, remarks } = req.body;
    
    let attendance = await Attendance.findOne({ employeeId, date });
    
    if (attendance) {
      // Update existing record
      Object.assign(attendance, {
        status,
        remarks,
        lastModifiedBy: req.user._id,
      });
      
      if (checkIn) {
        attendance.checkIn = {
          time: checkIn,
          method: 'manual',
          location: 'Office',
        };
      }
      
      if (checkOut) {
        attendance.checkOut = {
          time: checkOut,
          method: 'manual',
          location: 'Office',
        };
      }
    } else {
      // Create new record
      attendance = new Attendance({
        employeeId,
        date,
        status,
        remarks,
        lastModifiedBy: req.user._id,
        ...(checkIn && {
          checkIn: {
            time: checkIn,
            method: 'manual',
            location: 'Office',
          },
        }),
        ...(checkOut && {
          checkOut: {
            time: checkOut,
            method: 'manual',
            location: 'Office',
          },
        }),
      });
    }
    
    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;