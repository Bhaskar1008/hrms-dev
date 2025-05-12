import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, authorize } from '../middleware/auth.js';
import Performance from '../models/Performance.js';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Validation middleware
const goalValidation = [
  body('title').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('targetDate').isISO8601().toDate(),
];

const feedbackValidation = [
  body('feedback').notEmpty().trim(),
  body('tags').isArray(),
  body('tags.*').isIn(['technical', 'communication', 'leadership', 'teamwork', 'problemSolving']),
];

// Get performance reviews for current user
router.get('/me', auth, async (req, res) => {
  try {
    const { cycleId } = req.query;
    const query = { employeeId: req.user._id };
    
    if (cycleId) query.cycleId = cycleId;
    
    const reviews = await Performance.find(query)
      .populate('reviewerId', 'name employeeId')
      .sort({ startDate: -1 });
      
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all performance reviews (HR & Admin only)
router.get('/all', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const { cycleId, status, employeeId } = req.query;
    const query = {};
    
    if (cycleId) query.cycleId = cycleId;
    if (status) query.status = status;
    if (employeeId) query.employeeId = employeeId;
    
    const reviews = await Performance.find(query)
      .populate('employeeId', 'name employeeId department')
      .populate('reviewerId', 'name employeeId')
      .sort({ startDate: -1 });
      
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create performance review cycle (HR & Admin only)
router.post('/cycle', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const { cycleId, startDate, endDate, employeeIds } = req.body;
    
    // Create performance reviews for all employees
    const reviews = await Promise.all(employeeIds.map(async (employeeId) => {
      try {
        const review = new Performance({
          employeeId,
          cycleId,
          startDate,
          endDate,
          status: 'draft',
        });
        
        await review.save();
        return { employeeId, success: true, review };
      } catch (error) {
        return { employeeId, error: error.message };
      }
    }));
    
    res.status(201).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add/Update goals
router.post('/:id/goals', auth, goalValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const review = await Performance.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Performance review not found' });
    }
    
    if (review.status === 'completed') {
      return res.status(400).json({ message: 'Review cycle is completed' });
    }
    
    const { title, description, targetDate } = req.body;
    
    review.goals.push({
      title,
      description,
      targetDate,
    });
    
    if (review.status === 'draft') {
      review.status = 'inProgress';
    }
    
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update goal progress
router.patch('/:id/goals/:goalId', auth, async (req, res) => {
  try {
    const { progress, status, comments } = req.body;
    
    const review = await Performance.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Performance review not found' });
    }
    
    const goal = review.goals.id(req.params.goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    if (progress !== undefined) goal.progress = progress;
    if (status) goal.status = status;
    if (comments) {
      goal.comments.push({
        text: comments,
        by: req.user._id,
      });
    }
    
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit self assessment
router.post('/:id/self-assessment', auth, async (req, res) => {
  try {
    const { strengths, improvements, achievements } = req.body;
    
    const review = await Performance.findOne({
      _id: req.params.id,
      employeeId: req.user._id,
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Performance review not found' });
    }
    
    if (review.selfAssessment.submitted) {
      return res.status(400).json({ message: 'Self assessment already submitted' });
    }
    
    review.selfAssessment = {
      strengths,
      improvements,
      achievements,
      submitted: true,
      submittedAt: new Date(),
    };
    
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit manager assessment
router.post('/:id/manager-assessment', auth, authorize('manager', 'hr'), async (req, res) => {
  try {
    const {
      strengths,
      improvements,
      rating,
      feedback,
    } = req.body;
    
    const review = await Performance.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Performance review not found' });
    }
    
    if (!review.selfAssessment.submitted) {
      return res.status(400).json({ message: 'Self assessment not submitted yet' });
    }
    
    review.reviewerId = req.user._id;
    review.managerAssessment = {
      strengths,
      improvements,
      rating,
      feedback,
      submitted: true,
      submittedAt: new Date(),
    };
    
    review.status = 'completed';
    
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Acknowledge review
router.post('/:id/acknowledge', auth, async (req, res) => {
  try {
    const { comments } = req.body;
    
    const review = await Performance.findOne({
      _id: req.params.id,
      employeeId: req.user._id,
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Performance review not found' });
    }
    
    if (!review.managerAssessment.submitted) {
      return res.status(400).json({ message: 'Manager assessment not submitted yet' });
    }
    
    review.acknowledgement = {
      acknowledged: true,
      acknowledgedAt: new Date(),
      comments,
    };
    
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Give feedback
router.post('/feedback', auth, feedbackValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {
      to,
      cycleId,
      feedback: feedbackText,
      tags,
      visibility,
      anonymous,
    } = req.body;
    
    const feedback = new Feedback({
      from: req.user._id,
      to,
      cycleId,
      feedback: feedbackText,
      tags,
      visibility,
      anonymous,
    });
    
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get feedback received
router.get('/feedback/received', auth, async (req, res) => {
  try {
    const { cycleId } = req.query;
    const query = { to: req.user._id };
    
    if (cycleId) query.cycleId = cycleId;
    
    const feedback = await Feedback.find(query)
      .populate('from', 'name employeeId')
      .sort({ createdAt: -1 });
      
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get feedback given
router.get('/feedback/given', auth, async (req, res) => {
  try {
    const { cycleId } = req.query;
    const query = { from: req.user._id };
    
    if (cycleId) query.cycleId = cycleId;
    
    const feedback = await Feedback.find(query)
      .populate('to', 'name employeeId')
      .sort({ createdAt: -1 });
      
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;