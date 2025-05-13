import { FastifyPluginAsync } from 'fastify';
import { Leave } from '../models/Leave.js';
import { LeaveType } from '../models/LeaveType.js';

export const leaveRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all leaves
  fastify.get('/', async (request, reply) => {
    const { status, leaveTypeId, page = 1, pageSize = 10 } = request.query as any;
    
    const query: any = {};
    if (status) query.status = status;
    if (leaveTypeId) query.leaveTypeId = leaveTypeId;

    const skip = (page - 1) * pageSize;
    
    const [leaves, totalCount] = await Promise.all([
      Leave.find(query)
        .skip(skip)
        .limit(pageSize)
        .populate('employeeId', 'firstName lastName')
        .populate('leaveTypeId', 'name')
        .populate('approvedBy', 'name'),
      Leave.countDocuments(query)
    ]);

    return {
      data: leaves,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / pageSize)
    };
  });

  // Create leave request
  fastify.post('/', async (request, reply) => {
    const leave = new Leave(request.body);
    await leave.save();
    
    return leave.populate([
      { path: 'employeeId', select: 'firstName lastName' },
      { path: 'leaveTypeId', select: 'name' }
    ]);
  });

  // Get leave by ID
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    const leave = await Leave.findById(id)
      .populate('employeeId', 'firstName lastName')
      .populate('leaveTypeId', 'name')
      .populate('approvedBy', 'name');
      
    if (!leave) {
      reply.code(404);
      throw new Error('Leave request not found');
    }
    
    return leave;
  });

  // Update leave request
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    const leave = await Leave.findByIdAndUpdate(
      id,
      request.body,
      { new: true }
    ).populate([
      { path: 'employeeId', select: 'firstName lastName' },
      { path: 'leaveTypeId', select: 'name' },
      { path: 'approvedBy', select: 'name' }
    ]);

    if (!leave) {
      reply.code(404);
      throw new Error('Leave request not found');
    }
    
    return leave;
  });

  // Approve leave request
  fastify.put('/:id/approve', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { approverId } = request.body as { approverId: string };
    
    const leave = await Leave.findByIdAndUpdate(
      id,
      {
        status: 'approved',
        approvedBy: approverId,
        approvedDate: new Date()
      },
      { new: true }
    ).populate([
      { path: 'employeeId', select: 'firstName lastName' },
      { path: 'leaveTypeId', select: 'name' },
      { path: 'approvedBy', select: 'name' }
    ]);

    if (!leave) {
      reply.code(404);
      throw new Error('Leave request not found');
    }
    
    return leave;
  });

  // Reject leave request
  fastify.put('/:id/reject', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { approverId } = request.body as { approverId: string };
    
    const leave = await Leave.findByIdAndUpdate(
      id,
      {
        status: 'rejected',
        approvedBy: approverId,
        approvedDate: new Date()
      },
      { new: true }
    ).populate([
      { path: 'employeeId', select: 'firstName lastName' },
      { path: 'leaveTypeId', select: 'name' },
      { path: 'approvedBy', select: 'name' }
    ]);

    if (!leave) {
      reply.code(404);
      throw new Error('Leave request not found');
    }
    
    return leave;
  });

  // Get leave types
  fastify.get('/types', async (request, reply) => {
    const leaveTypes = await LeaveType.find();
    return leaveTypes;
  });

  // Create leave type
  fastify.post('/types', async (request, reply) => {
    const leaveType = new LeaveType(request.body);
    await leaveType.save();
    return leaveType;
  });
};