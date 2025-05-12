import { 
  User, 
  Employee, 
  Attendance, 
  Leave, 
  Payroll, 
  Performance,
  Notification,
  BiometricLog
} from '../types';

// Current user
export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin',
  avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

// Employees
export const employees: Employee[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-123-4567',
    department: 'Engineering',
    designation: 'Software Engineer',
    joiningDate: '2023-01-15',
    manager: 'Jane Smith',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    deviceId: 'ZKT123',
    salaryStructure: 'Basic+HRA+PF'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-987-6543',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    joiningDate: '2022-06-10',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    deviceId: 'ZKT124',
    salaryStructure: 'Basic+HRA+PF'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1-555-456-7890',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    joiningDate: '2023-03-22',
    manager: 'Jane Smith',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    deviceId: 'ZKT125',
    salaryStructure: 'Basic+HRA'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1-555-789-0123',
    department: 'Human Resources',
    designation: 'HR Manager',
    joiningDate: '2022-09-01',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    deviceId: 'ZKT126',
    salaryStructure: 'Basic+HRA+PF+Bonus'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1-555-234-5678',
    department: 'Finance',
    designation: 'Financial Analyst',
    joiningDate: '2023-02-15',
    manager: 'Emily Davis',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    deviceId: 'ZKT127',
    salaryStructure: 'Basic+HRA+PF'
  }
];

// Attendance data
export const attendanceData: Attendance[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    date: '2023-05-11',
    checkIn: '09:00',
    checkOut: '18:00',
    status: 'present',
    method: 'biometric',
    location: 'Main Office'
  },
  {
    id: '2',
    employeeId: 'EMP001',
    date: '2023-05-12',
    checkIn: '09:15',
    checkOut: '18:30',
    status: 'present',
    method: 'biometric',
    location: 'Main Office'
  },
  {
    id: '3',
    employeeId: 'EMP002',
    date: '2023-05-11',
    checkIn: '08:45',
    checkOut: '17:30',
    status: 'present',
    method: 'biometric',
    location: 'Main Office'
  },
  {
    id: '4',
    employeeId: 'EMP003',
    date: '2023-05-11',
    status: 'absent',
    method: 'auto'
  },
  {
    id: '5',
    employeeId: 'EMP004',
    date: '2023-05-11',
    checkIn: '09:30',
    checkOut: '18:15',
    status: 'late',
    method: 'biometric',
    location: 'Main Office',
    remarks: 'Traffic delay'
  }
];

// Leave data
export const leaveData: Leave[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    type: 'casual',
    startDate: '2023-06-01',
    endDate: '2023-06-02',
    days: 2,
    reason: 'Personal work',
    status: 'approved',
    approvedBy: 'Jane Smith',
    appliedOn: '2023-05-25'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    type: 'sick',
    startDate: '2023-05-10',
    endDate: '2023-05-11',
    days: 2,
    reason: 'Not feeling well',
    status: 'approved',
    approvedBy: 'Emily Davis',
    appliedOn: '2023-05-09'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    type: 'privilege',
    startDate: '2023-06-15',
    endDate: '2023-06-22',
    days: 8,
    reason: 'Family vacation',
    status: 'pending',
    appliedOn: '2023-05-20'
  },
  {
    id: '4',
    employeeId: 'EMP001',
    type: 'unpaid',
    startDate: '2023-07-10',
    endDate: '2023-07-14',
    days: 5,
    reason: 'Personal emergency',
    status: 'pending',
    appliedOn: '2023-05-28'
  }
];

// Payroll data
export const payrollData: Payroll[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    month: '04',
    year: '2023',
    basic: 5000,
    hra: 2000,
    allowances: 1000,
    deductions: 500,
    tax: 750,
    netSalary: 6750,
    status: 'paid',
    paidOn: '2023-05-01'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    month: '04',
    year: '2023',
    basic: 6000,
    hra: 2400,
    allowances: 1200,
    deductions: 600,
    tax: 900,
    netSalary: 8100,
    status: 'paid',
    paidOn: '2023-05-01'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    month: '04',
    year: '2023',
    basic: 4500,
    hra: 1800,
    allowances: 900,
    deductions: 450,
    tax: 675,
    netSalary: 6075,
    status: 'paid',
    paidOn: '2023-05-01'
  },
  {
    id: '4',
    employeeId: 'EMP001',
    month: '05',
    year: '2023',
    basic: 5000,
    hra: 2000,
    allowances: 1000,
    deductions: 500,
    tax: 750,
    netSalary: 6750,
    status: 'processed'
  }
];

// Performance data
export const performanceData: Performance[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    cycleId: 'Q2-2023',
    goals: [
      {
        id: '101',
        title: 'Complete Project X',
        description: 'Deliver all modules for Project X on time',
        targetDate: '2023-06-30',
        progress: 75,
        status: 'inProgress'
      },
      {
        id: '102',
        title: 'Learn New Framework',
        description: 'Complete certification in React Advanced',
        targetDate: '2023-07-15',
        progress: 40,
        status: 'inProgress'
      }
    ],
    status: 'inProgress'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    cycleId: 'Q2-2023',
    goals: [
      {
        id: '201',
        title: 'Team Mentorship',
        description: 'Mentor junior developers and conduct code reviews',
        targetDate: '2023-06-30',
        progress: 80,
        status: 'inProgress'
      },
      {
        id: '202',
        title: 'System Architecture',
        description: 'Design and document new system architecture',
        targetDate: '2023-06-15',
        progress: 100,
        status: 'completed'
      }
    ],
    rating: 4.5,
    feedback: 'Excellent progress on mentorship and system architecture tasks.',
    status: 'inProgress'
  }
];

// Notifications
export const notificationData: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Leave Approval',
    message: 'Your leave request has been approved',
    type: 'success',
    read: false,
    createdAt: '2023-05-26T10:30:00',
    link: '/leave-management'
  },
  {
    id: '2',
    userId: '1',
    title: 'Payslip Generated',
    message: 'Your payslip for April 2023 has been generated',
    type: 'info',
    read: true,
    createdAt: '2023-05-02T09:15:00',
    link: '/payroll-management'
  },
  {
    id: '3',
    userId: '1',
    title: 'Performance Review',
    message: 'Your performance review is scheduled for next week',
    type: 'warning',
    read: false,
    createdAt: '2023-05-25T14:00:00',
    link: '/performance-management'
  },
  {
    id: '4',
    userId: '1',
    title: 'Late Check-in',
    message: 'You were marked late on May 21, 2023',
    type: 'error',
    read: false,
    createdAt: '2023-05-21T09:45:00',
    link: '/attendance-management'
  }
];

// Biometric logs
export const biometricLogs: BiometricLog[] = [
  {
    id: '1',
    deviceId: 'ZKT123',
    employeeId: 'EMP001',
    timestamp: '2023-05-11T09:00:00',
    event: 'check_in',
    status: 'success'
  },
  {
    id: '2',
    deviceId: 'ZKT123',
    employeeId: 'EMP001',
    timestamp: '2023-05-11T18:00:00',
    event: 'check_out',
    status: 'success'
  },
  {
    id: '3',
    deviceId: 'ZKT124',
    employeeId: 'EMP002',
    timestamp: '2023-05-11T08:45:00',
    event: 'check_in',
    status: 'success'
  },
  {
    id: '4',
    deviceId: 'ZKT124',
    employeeId: 'EMP002',
    timestamp: '2023-05-11T17:30:00',
    event: 'check_out',
    status: 'success'
  },
  {
    id: '5',
    deviceId: 'ZKT126',
    employeeId: 'EMP004',
    timestamp: '2023-05-11T09:30:00',
    event: 'check_in',
    status: 'success'
  }
];