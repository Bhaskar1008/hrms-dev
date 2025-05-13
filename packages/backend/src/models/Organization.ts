import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: String,
  address: String,
  phone: String,
  email: String,
  website: String,
  logo: String,
}, {
  timestamps: true
});

export const Organization = mongoose.model('Organization', organizationSchema);