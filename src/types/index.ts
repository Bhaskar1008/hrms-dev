export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'employee';
  avatar?: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  manager?: string;
  status: 'active' | 'inactive' | 'onboarding' | 'exit';
  avatar?: string;
  deviceId?: string; // For biometric
  salaryStructure?: string;
  documents?: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'weekend' | 'holiday';
  method: 'biometric' | 'mobile' | 'manual' | 'auto';
  location?: string;
  remarks?: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  type: 'casual' | 'sick' | 'privilege' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  appliedOn: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  month: string;
  year: string;
  basic: number;
  hra: number;
  allowances: number;
  deductions: number;
  tax: number;
  netSalary: number;
  status: 'draft' | 'processed' | 'paid';
  paidOn?: string;
}

export interface Performance {
  id: string;
  employeeId: string;
  cycleId: string;
  goals: Goal[];
  rating?: number;
  feedback?: string;
  status: 'draft' | 'inProgress' | 'completed';
  reviewDate?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number; // 0-100
  status: 'pending' | 'inProgress' | 'completed';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface BiometricLog {
  id: string;
  deviceId: string;
  employeeId: string;
  timestamp: string;
  event: 'check_in' | 'check_out';
  status: 'success' | 'failed';
}