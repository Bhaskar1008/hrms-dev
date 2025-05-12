import mongoose from 'mongoose';

const leaveBalanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  balances: {
    casual: {
      total: { type: Number, default: 12 },
      used: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
    },
    sick: {
      total: { type: Number, default: 8 },
      used: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
    },
    privilege: {
      total: { type: Number, default: 15 },
      used: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
    },
  },
  carryForward: {
    privilege: { type: Number, default: 0 },
  },
}, {
  timestamps: true,
});

// Index for efficient queries
leaveBalanceSchema.index({ employeeId: 1, year: 1 }, { unique: true });

// Method to check if leave can be applied
leaveBalanceSchema.methods.canApplyLeave = function(type, days) {
  if (type === 'unpaid') return true;
  
  const balance = this.balances[type];
  const available = balance.total - (balance.used + balance.pending);
  return available >= days;
};

// Method to update balance when leave is approved/rejected
leaveBalanceSchema.methods.updateBalance = function(type, days, action) {
  if (type === 'unpaid') return;
  
  const balance = this.balances[type];
  
  switch (action) {
    case 'apply':
      balance.pending += days;
      break;
    case 'approve':
      balance.pending -= days;
      balance.used += days;
      break;
    case 'reject':
    case 'cancel':
      balance.pending -= days;
      break;
  }
};

const LeaveBalance = mongoose.model('LeaveBalance', leaveBalanceSchema);

export default LeaveBalance;