import { FastifyPluginAsync } from 'fastify';
import { Organization } from '../models/Organization.js';

export const organizationRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all organizations
  fastify.get('/', async (request, reply) => {
    const organizations = await Organization.find();
    return { data: organizations };
  });

  // Create organization
  fastify.post('/', async (request, reply) => {
    const organization = new Organization(request.body);
    await organization.save();
    return organization;
  });

  // Get organization by ID
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const organization = await Organization.findById(id);
    
    if (!organization) {
      reply.code(404);
      throw new Error('Organization not found');
    }
    
    return organization;
  });

  // Update organization
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const organization = await Organization.findByIdAndUpdate(
      id,
      request.body,
      { new: true }
    );
    
    if (!organization) {
      reply.code(404);
      throw new Error('Organization not found');
    }
    
    return organization;
  });

  // Delete organization
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await Organization.findByIdAndDelete(id);
    return { success: true };
  });
};