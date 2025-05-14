import { FastifyPluginAsync } from 'fastify';
import { User } from '../models/User.js';
import { Organization } from '../models/Organization.js';
import { Employee } from '../models/Employee.js';
import { LeaveType } from '../models/LeaveType.js';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Register
  fastify.post('/register', async (request, reply) => {
    const { name, email, password, role = 'employee', organizationId } = request.body as {
      name: string;
      email: string;
      password: string;
      role?: 'super_admin' | 'hr' | 'employee';
      organizationId: string;
    };

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      reply.code(400);
      throw new Error('User already exists');
    }

    // Validate organization
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      reply.code(400);
      throw new Error('Invalid organization');
    }

    // Create user
    const user = new User({
      name,
      email,
      role,
      organizationId,
      permissions: role === 'super_admin' ? ['*'] : []
    });

    // Set password
    user.setPassword(password);

    // Save user
    await user.save();

    // Generate token
    const token = fastify.jwt.sign({ 
      id: user._id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      organizationId: user.organizationId
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        organizationId: user.organizationId
      },
      token
    };
  });

  // Login
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    
    const user = await User.findOne({ email });
    if (!user) {
      reply.code(401);
      throw new Error('Invalid credentials');
    }

    const isValid = user.validatePassword(password);
    if (!isValid) {
      reply.code(401);
      throw new Error('Invalid credentials');
    }

    const token = fastify.jwt.sign({ 
      id: user._id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      organizationId: user.organizationId
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        organizationId: user.organizationId,
        avatar: user.avatar
      },
      token
    };
  });

  // Get current user
  fastify.get('/me', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        reply.code(401);
        throw new Error('No token provided');
      }

      const decoded = fastify.jwt.verify(token) as any;
      const user = await User.findById(decoded.id).select('-hashedPassword -salt');
      
      if (!user) {
        reply.code(404);
        throw new Error('User not found');
      }

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        organizationId: user.organizationId,
        avatar: user.avatar
      };
    } catch (error) {
      reply.code(401);
      throw new Error('Invalid token');
    }
  });

  // Initialize demo data
  fastify.post('/init', async (request, reply) => {
    // Create organization
    const organization = new Organization({
      name: 'Demo Company',
      industry: 'Technology',
      address: '123 Tech Street, Silicon Valley',
      phone: '+1 (555) 123-4567',
      email: 'contact@democompany.com',
      website: 'www.democompany.com'
    });
    await organization.save();

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@democompany.com',
      role: 'super_admin',
      permissions: ['*'],
      organizationId: organization._id
    });
    adminUser.setPassword('admin123');
    await adminUser.save();

    // Create HR user
    const hrUser = new User({
      name: 'HR Manager',
      email: 'hr@democompany.com',
      role: 'hr',
      permissions: ['employees:*', 'leaves:*', 'attendance:*'],
      organizationId: organization._id
    });
    hrUser.setPassword('hr123');
    await hrUser.save();

    // Create employee user
    const employeeUser = new User({
      name: 'John Employee',
      email: 'employee@democompany.com',
      role: 'employee',
      permissions: ['profile:*', 'leaves:request'],
      organizationId: organization._id
    });
    employeeUser.setPassword('employee123');
    await employeeUser.save();

    // Create employee record
    const employee = new Employee({
      firstName: 'John',
      lastName: 'Employee',
      email: 'employee@democompany.com',
      phone: '+1 (555) 987-6543',
      jobTitle: 'Software Developer',
      hireDate: new Date('2023-01-15'),
      status: 'active',
      organizationId: organization._id
    });
    await employee.save();

    // Create leave types
    const leaveTypes = [
      { name: 'Annual Leave', allowance: 20 },
      { name: 'Sick Leave', allowance: 10 },
      { name: 'Personal Leave', allowance: 5 }
    ];

    for (const type of leaveTypes) {
      const leaveType = new LeaveType({
        ...type,
        organizationId: organization._id
      });
      await leaveType.save();
    }

    return {
      message: 'Demo data initialized successfully',
      organization: {
        id: organization._id,
        name: organization.name
      },
      users: [
        {
          email: 'admin@democompany.com',
          password: 'admin123',
          role: 'super_admin'
        },
        {
          email: 'hr@democompany.com',
          password: 'hr123',
          role: 'hr'
        },
        {
          email: 'employee@democompany.com',
          password: 'employee123',
          role: 'employee'
        }
      ]
    };
  });
};