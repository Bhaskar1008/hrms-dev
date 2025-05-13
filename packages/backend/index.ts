import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import mongoose from 'mongoose';
import { employeeRoutes } from './src/routes/employees.js';
import { authRoutes } from './src/routes/auth.js';
import { leaveRoutes } from './src/routes/leaves.js';
import { organizationRoutes } from './src/routes/organizations.js';
import { uiRoutes } from './src/routes/ui.js';
import { dashboardRoutes } from './src/routes/dashboard.js';

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
await mongoose.connect('mongodb+srv://bhaskarkeelu92:iIGLYgCuz16TMU4n@hrms-dev-cluster.h3plyfw.mongodb.net/hrms');

// Register routes
fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(employeeRoutes, { prefix: '/api/employees' });
fastify.register(leaveRoutes, { prefix: '/api/leaves' });
fastify.register(organizationRoutes, { prefix: '/api/organizations' });
fastify.register(uiRoutes, { prefix: '/api/ui' });
fastify.register(dashboardRoutes, { prefix: '/api/dashboard' });

// Start server
try {
  await fastify.listen({ port: 3001 });
  console.log('Server running at http://localhost:3001');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}