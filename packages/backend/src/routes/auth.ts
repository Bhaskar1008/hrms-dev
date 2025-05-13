import { FastifyPluginAsync } from 'fastify';
import { User } from '../models/User.js';
import { Organization } from '../models/Organization.js';

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
      permissions: user.permissions
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
      permissions: user.permissions
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

      const decoded = fastify.jwt.verify(token);
      const user = await User.findById(decoded.id).select('-hashedPassword -salt');
      
      if (!user) {
        reply.code(404);
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      reply.code(401);
      throw new Error('Invalid token');
    }
  });
};