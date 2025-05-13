import { FastifyPluginAsync } from 'fastify';
import { Employee } from '../models/Employee.js';

export const employeeRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all employees
  fastify.get('/', async (request, reply) => {
    const employees = await Employee.find();
    return { data: employees };
  });

  // Create employee
  fastify.post('/', async (request, reply) => {
    const employee = new Employee(request.body);
    await employee.save();
    return employee;
  });

  // Get employee by ID
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const employee = await Employee.findById(id);
    return employee;
  });

  // Update employee
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const employee = await Employee.findByIdAndUpdate(id, request.body, { new: true });
    return employee;
  });

  // Delete employee
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await Employee.findByIdAndDelete(id);
    return { success: true };
  });
};