import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  jobTitle: String,
  hireDate: Date,
  status: {
    type: String,
    enum: ['active', 'inactive', 'probation'],
    default: 'active'
  },
  organizationId: { type: mongoose.Schema.Types.ObjectId, required: true }
}, {
  timestamps: true
});

export const Employee = mongoose.model('Employee', employeeSchema);