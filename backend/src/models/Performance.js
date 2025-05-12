import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'completed'],
    default: 'pending',
  },
  comments: [{
    text: String,
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

const performanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cycleId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  goals: [goalSchema],
  selfAssessment: {
    strengths: String,
    improvements: String,
    achievements: String,
    submitted: {
      type: Boolean,
      default: false,
    },
    submittedAt: Date,
  },
  managerAssessment: {
    strengths: String,
    improvements: String,
    rating: {
      technical: {
        type: Number,
        min: 1,
        max: 5,
      },
      communication: {
        type: Number,
        min: 1,
        max: 5,
      },
      leadership: {
        type: Number,
        min: 1,
        max: 5,
      },
      teamwork: {
        type: Number,
        min: 1,
        max: 5,
      },
      overall: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    feedback: String,
    submitted: {
      type: Boolean,
      default: false,
    },
    submittedAt: Date,
  },
  status: {
    type: String,
    enum: ['draft', 'inProgress', 'completed'],
    default: 'draft',
  },
  acknowledgement: {
    acknowledged: {
      type: Boolean,
      default: false,
    },
    acknowledgedAt: Date,
    comments: String,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
performanceSchema.index({ employeeId: 1, cycleId: 1 }, { unique: true });

const Performance = mongoose.model('Performance', performanceSchema);

export default Performance;