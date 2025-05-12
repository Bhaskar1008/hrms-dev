import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkIn: {
    time: Date,
    location: {
      type: String,
      default: 'Office'
    },
    method: {
      type: String,
      enum: ['biometric', 'mobile', 'manual', 'auto'],
      default: 'biometric'
    }
  },
  checkOut: {
    time: Date,
    location: {
      type: String,
      default: 'Office'
    },
    method: {
      type: String,
      enum: ['biometric', 'mobile', 'manual', 'auto'],
      default: 'biometric'
    }
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day', 'weekend', 'holiday'],
    required: true,
  },
  workHours: {
    type: Number,
    default: 0,
  },
  overtime: {
    type: Number,
    default: 0,
  },
  remarks: String,
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
});

// Index for efficient queries
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

// Method to calculate work hours
attendanceSchema.methods.calculateWorkHours = function() {
  if (this.checkIn?.time && this.checkOut?.time) {
    const checkInTime = new Date(this.checkIn.time);
    const checkOutTime = new Date(this.checkOut.time);
    const diffHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
    this.workHours = Math.round(diffHours * 100) / 100;
    
    // Calculate overtime (assuming 8 hours standard workday)
    this.overtime = Math.max(0, this.workHours - 8);
  }
};

// Pre-save middleware to calculate work hours
attendanceSchema.pre('save', function(next) {
  this.calculateWorkHours();
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;