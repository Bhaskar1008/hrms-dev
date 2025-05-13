import mongoose from 'mongoose';

const employeeStatsSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  totalEmployees: { type: Number, default: 0 },
  activeEmployees: { type: Number, default: 0 },
  onLeave: { type: Number, default: 0 },
  newThisMonth: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export const EmployeeStats = mongoose.model('EmployeeStats', employeeStatsSchema);