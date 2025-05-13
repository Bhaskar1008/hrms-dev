import { FastifyPluginAsync } from 'fastify';

export const uiRoutes: FastifyPluginAsync = async (fastify) => {
  // Get navigation config
  fastify.get('/navigation', async (request, reply) => {
    const { role } = request.query as { role?: string };
    
    if (!role) {
      reply.code(400);
      throw new Error('Role parameter is required');
    }

    const navigation = {
      super_admin: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: 'Layout'
        },
        {
          name: 'Employee Management',
          icon: 'Users',
          children: [
            {
              name: 'All Employees',
              href: '/employees'
            },
            {
              name: 'Departments',
              href: '/departments'
            }
          ]
        },
        {
          name: 'Attendance',
          href: '/attendance',
          icon: 'Clock'
        },
        {
          name: 'Leave Management',
          href: '/leaves',
          icon: 'Calendar'
        },
        {
          name: 'Payroll',
          href: '/payroll',
          icon: 'DollarSign'
        },
        {
          name: 'Projects',
          href: '/projects',
          icon: 'Briefcase'
        },
        {
          name: 'Organizations',
          href: '/organizations',
          icon: 'Building'
        },
        {
          name: 'Settings',
          href: '/settings',
          icon: 'Settings'
        }
      ],
      hr: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: 'Layout'
        },
        {
          name: 'Employee Management',
          icon: 'Users',
          children: [
            {
              name: 'All Employees',
              href: '/employees'
            },
            {
              name: 'Departments',
              href: '/departments'
            }
          ]
        },
        {
          name: 'Attendance',
          href: '/attendance',
          icon: 'Clock'
        },
        {
          name: 'Leave Management',
          href: '/leaves',
          icon: 'Calendar'
        },
        {
          name: 'Payroll',
          href: '/payroll',
          icon: 'DollarSign'
        },
        {
          name: 'Projects',
          href: '/projects',
          icon: 'Briefcase'
        },
        {
          name: 'Settings',
          href: '/settings',
          icon: 'Settings'
        }
      ],
      employee: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: 'Layout'
        },
        {
          name: 'My Profile',
          href: '/profile',
          icon: 'User'
        },
        {
          name: 'Attendance',
          href: '/attendance',
          icon: 'Clock'
        },
        {
          name: 'Leave Requests',
          href: '/leaves',
          icon: 'Calendar'
        },
        {
          name: 'My Payslips',
          href: '/payroll',
          icon: 'DollarSign'
        },
        {
          name: 'My Projects',
          href: '/projects',
          icon: 'Briefcase'
        }
      ]
    };

    return navigation[role as keyof typeof navigation] || [];
  });

  // Get dashboard config
  fastify.get('/dashboard', async (request, reply) => {
    const { role } = request.query as { role?: string };
    
    if (!role) {
      reply.code(400);
      throw new Error('Role parameter is required');
    }

    const dashboardConfig = {
      super_admin: [
        {
          id: 'employee-stats',
          type: 'stats',
          title: 'Employee Statistics',
          dataUrl: '/dashboard/employee-stats',
          size: 'medium',
          refresh: 300
        },
        {
          id: 'recent-leaves',
          type: 'table',
          title: 'Recent Leave Requests',
          dataUrl: '/dashboard/recent-leaves',
          size: 'medium',
          refresh: 300
        }
      ],
      hr: [
        {
          id: 'employee-stats',
          type: 'stats',
          title: 'Employee Statistics',
          dataUrl: '/dashboard/employee-stats',
          size: 'medium',
          refresh: 300
        },
        {
          id: 'recent-leaves',
          type: 'table',
          title: 'Recent Leave Requests',
          dataUrl: '/dashboard/recent-leaves',
          size: 'medium',
          refresh: 300
        }
      ],
      employee: [
        {
          id: 'my-attendance',
          type: 'stats',
          title: 'My Attendance',
          dataUrl: '/dashboard/my-attendance',
          size: 'small',
          refresh: 300
        },
        {
          id: 'leave-balance',
          type: 'stats',
          title: 'Leave Balance',
          dataUrl: '/dashboard/my-leave-balance',
          size: 'small',
          refresh: 300
        }
      ]
    };

    return dashboardConfig[role as keyof typeof dashboardConfig] || [];
  });
};
