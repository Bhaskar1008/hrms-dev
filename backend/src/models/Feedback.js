import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cycleId: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    enum: ['technical', 'communication', 'leadership', 'teamwork', 'problemSolving'],
  }],
  visibility: {
    type: String,
    enum: ['public', 'private', 'manager'],
    default: 'private',
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
feedbackSchema.index({ to: 1, cycleId: 1 });
feedbackSchema.index({ from: 1, cycleId: 1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;