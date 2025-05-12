import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    ref: 'Role',
  }],
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'onboarding', 'exit'],
    default: 'active',
  },
  reportingTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  avatar: String,
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String,
  },
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadedAt: Date,
  }],
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate employee ID
userSchema.statics.generateEmployeeId = async function() {
  const count = await this.countDocuments();
  const year = new Date().getFullYear().toString().slice(-2);
  return `EMP${year}${(count + 1).toString().padStart(4, '0')}`;
};

const User = mongoose.model('User', userSchema);

export default User;