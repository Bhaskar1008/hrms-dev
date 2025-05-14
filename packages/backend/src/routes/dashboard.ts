import { FastifyPluginAsync } from 'fastify';
import { Employee } from '../models/Employee.js';
import { Leave } from '../models/Leave.js';
import { LeaveType } from '../models/LeaveType.js';
import { startOfMonth, format } from 'date-fns';

export const dashboardRoutes: FastifyPluginAsync = async (fastify) => {
  // Employee statistics
  fastify.get('/employee-stats', async (request, reply) => {
    const { organizationId } = request.query as { organizationId?: string };

    if (!organizationId) {
      reply.code(400);
      throw new Error('Organization ID is required');
    }

    const now = new Date();
    const startOfCurrentMonth = startOfMonth(now);

    const [totalEmployees, activeEmployees, onLeave, newThisMonth] = await Promise.all([
      Employee.countDocuments({ organizationId }),
      Employee.countDocuments({ organizationId, status: 'active' }),
      Leave.countDocuments({
        organizationId,
        status: 'approved',
        startDate: { $lte: now },
        endDate: { $gte: now }
      }),
      Employee.countDocuments({
        organizationId,
        createdAt: { $gte: startOfCurrentMonth }
      })
    ]);

    return {
      stats: [
        { label: 'Total Employees', value: totalEmployees.toString() },
        { label: 'Active', value: activeEmployees.toString() },
        { label: 'On Leave', value: onLeave.toString() },
        { label: 'New This Month', value: newThisMonth.toString() }
      ]
    };
  });

  // Recent leave requests
  fastify.get('/recent-leaves', async (request, reply) => {
    const { organizationId } = request.query as { organizationId?: string };

    if (!organizationId) {
      reply.code(400);
      throw new Error('Organization ID is required');
    }

    const leaves = await Leave.find({ organizationId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('employeeId', 'firstName lastName')
      .populate('leaveTypeId', 'name');

    const rows = leaves.map(leave => [
      `${leave.employeeId.firstName} ${leave.employeeId.lastName}`,
      leave.leaveTypeId.name,
      format(new Date(leave.startDate), 'MMM dd, yyyy'),
      format(new Date(leave.endDate), 'MMM dd, yyyy'),
      leave.status.charAt(0).toUpperCase() + leave.status.slice(1)
    ]);

    return {
      headers: ['Employee', 'Type', 'From', 'To', 'Status'],
      rows
    };
  });

  // My attendance stats
  fastify.get('/my-attendance', async (request, reply) => {
    const { employeeId, organizationId } = request.query as { employeeId?: string; organizationId?: string };

    if (!employeeId || !organizationId) {
      reply.code(400);
      throw new Error('Employee ID and Organization ID are required');
    }

    // For demo, returning mock data
    // In production, this would query the Attendance collection
    return {
      stats: [
        { label: 'Present', value: '22' },
        { label: 'Late', value: '3' },
        { label: 'Absent', value: '1' },
        { label: 'Leave', value: '2' }
      ]
    };
  });

  // My leave balance
  fastify.get('/my-leave-balance', async (request, reply) => {
    const { employeeId, organizationId } = request.query as { employeeId?: string; organizationId?: string };

    if (!employeeId || !organizationId) {
      reply.code(400);
      throw new Error('Employee ID and Organization ID are required');
    }

    const leaveTypes = await LeaveType.find({ organizationId });
    const leaves = await Leave.find({
      employeeId,
      status: 'approved',
      startDate: { $gte: new Date(new Date().getFullYear(), 0, 1) }
    });

    const stats = leaveTypes.map(type => {
      const used = leaves.filter(leave => 
        leave.leaveTypeId.toString() === type._id.toString()
      ).length;

      return {
        label: type.name,
        value: `${used}/${type.allowance}`
      };
    });

    return { stats };
  });
};