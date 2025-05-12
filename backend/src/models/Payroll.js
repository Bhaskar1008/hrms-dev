import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
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
    pf: { type: Number, default: 0 },
    professionalTax: { type: Number, default: 0 },
    incomeTax: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },
  overtime: {
    hours: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
  },
  bonus: {
    type: Number,
    default: 0,
  },
  netSalary: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'processed', 'paid'],
    default: 'draft',
  },
  paidOn: Date,
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  remarks: String,
}, {
  timestamps: true,
});

// Index for efficient queries
payrollSchema.index({ employeeId: 1, year: 1, month: 1 }, { unique: true });

// Method to calculate net salary
payrollSchema.methods.calculateNetSalary = function() {
  const totalAllowances = Object.values(this.allowances).reduce((a, b) => a + b, 0);
  const totalDeductions = Object.values(this.deductions).reduce((a, b) => a + b, 0);
  const overtimeAmount = this.overtime.hours * this.overtime.rate;
  
  this.overtime.amount = overtimeAmount;
  this.netSalary = this.basic + this.hra + totalAllowances + overtimeAmount + this.bonus - totalDeductions;
};

// Pre-save middleware
payrollSchema.pre('save', function(next) {
  this.calculateNetSalary();
  next();
});

const Payroll = mongoose.model('Payroll', payrollSchema);

export default Payroll;