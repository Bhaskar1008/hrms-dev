import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  role: {
    type: String,
    enum: ['super_admin', 'hr', 'employee'],
    required: true
  },
  permissions: [String],
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  avatar: String,
}, {
  timestamps: true,
  methods: {
    setPassword(password: string) {
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hashedPassword = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    },
    validatePassword(password: string): boolean {
      console.log("Salt ======>",this.salt, this.hashedPassword);
      if (!this.salt || !this.hashedPassword) return false;
      const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
      console.log("Hash ======>",hash);
      console.log("Hashed Password ======>",this.hashedPassword);
      return this.hashedPassword === hash;
    }
  }
});

export const User = mongoose.model('User', userSchema);