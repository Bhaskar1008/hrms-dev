import mongoose from 'mongoose';

const salaryStructureSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  effectiveFrom: {
    type: Date,
    required: true,
  },
  basic: {
    type: Number,
    required: true,
    min: 0,
  },
  hra: {
    type: Number,
    required: true,
    min: 0,
  },
  allowances: {
    conveyance: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    special: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },
  deductions: {
    pf: {
      enabled: { type: Boolean, default: true },
      percentage: { type: Number, default: 12 },
    },
    professionalTax: {
      enabled: { type: Boolean, default: true },
      amount: { type: Number, default: 200 },
    },
  },
  overtimeRate: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  remarks: String,
}, {
  timestamps: true,
});

// Index for efficient queries
salaryStructureSchema.index({ employeeId: 1, effectiveFrom: 1 });

const SalaryStructure = mongoose.model('SalaryStructure', salaryStructureSchema);

export default SalaryStructure;