import mongoose from 'mongoose';

const leaveTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  allowance: { type: Number, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, required: true }
}, {
  timestamps: true
});

export const LeaveType = mongoose.model('LeaveType', leaveTypeSchema);