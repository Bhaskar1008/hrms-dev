import { FastifyPluginAsync } from 'fastify';
import { User } from '../models/User.js';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Login
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    
    const user = await User.findOne({ email });
    if (!user || !user.validatePassword(password)) {
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