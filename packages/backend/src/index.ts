import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mongoose from 'mongoose';
import { employeeRoutes } from './routes/employees.js';
import { authRoutes } from './routes/auth.js';
import { leaveRoutes } from './routes/leaves.js';

const fastify = Fastify({ logger: true });

// Register plugins
await fastify.register(cors, {
  origin: true,
  credentials: true
});

await fastify.register(jwt, {
  secret: 'your-secret-key' // Use environment variable in production
});

// Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/hrms');

// Register routes
fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(employeeRoutes, { prefix: '/api/employees' });
fastify.register(leaveRoutes, { prefix: '/api/leaves' });

// Start server
try {
  await fastify.listen({ port: 3001 });
  console.log('Server running at http://localhost:3001');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}