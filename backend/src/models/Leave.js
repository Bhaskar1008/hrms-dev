import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['casual', 'sick', 'privilege', 'unpaid'],
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
  days: {
    type: Number,
    required: true,
    min: 0.5,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending',
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rejectionReason: String,
  attachments: [{
    name: String,
    url: String,
    uploadedAt: Date,
  }],
  cancellationReason: String,
  cancelledAt: Date,
}, {
  timestamps: true,
});

// Index for efficient queries
leaveSchema.index({ employeeId: 1, startDate: 1, endDate: 1 });

// Method to calculate leave days
leaveSchema.methods.calculateDays = function() {
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  this.days = diffDays;
};

// Pre-save middleware
leaveSchema.pre('save', function(next) {
  if (this.isModified('startDate') || this.isModified('endDate')) {
    this.calculateDays();
  }
  next();
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;