import { format, addDays, differenceInDays } from 'date-fns';

// Middleware file for json-server
export default (req, res, next) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Mock authentication
  if (req.path === '/auth/login' && req.method === 'POST') {
    const { email, password } = req.body;
    
    // Simple mock authentication - in a real app, this would validate credentials properly
    let user;
    let token;
    
    if (email === 'admin@example.com' && password === 'password') {
      user = {
        id: '1',
        name: 'Super Admin',
        email: 'admin@example.com',
        role: 'super_admin',
        permissions: ['*'],
        organizationId: '1'
      };
      token = 'mock-admin-token';
    } else if (email === 'hr@example.com' && password === 'password') {
      user = {
        id: '2',
        name: 'HR Manager',
        email: 'hr@example.com',
        role: 'hr',
        permissions: [
          'employees:read', 'employees:create', 'employees:update', 'employees:delete',
          'attendance:read', 'attendance:manage',
          'leaves:read', 'leaves:approve', 'leaves:reject',
          'payroll:read', 'payroll:manage',
          'projects:read'
        ],
        organizationId: '1'
      };
      token = 'mock-hr-token';
    } else if (email === 'employee@example.com' && password === 'password') {
      user = {
        id: '3',
        name: 'John Employee',
        email: 'employee@example.com',
        role: 'employee',
        permissions: [
          'profile:read', 'profile:update',
          'attendance:read', 'attendance:mark',
          'leaves:read', 'leaves:request',
          'payroll:read',
          'projects:read'
        ],
        organizationId: '1'
      };
      token = 'mock-employee-token';
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    return res.json({ user, token });
  }
  
  // Mock "get me" endpoint for authentication
  if (req.path === '/auth/me' && req.method === 'GET') {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // In a real app, this would validate the token and fetch the user
    let user;
    
    if (token.includes('mock-admin-token')) {
      user = {
        id: '1',
        name: 'Super Admin',
        email: 'admin@example.com',
        role: 'super_admin',
        permissions: ['*'],
        organizationId: '1'
      };
    } else if (token.includes('mock-hr-token')) {
      user = {
        id: '2',
        name: 'HR Manager',
        email: 'hr@example.com',
        role: 'hr',
        permissions: [
          'employees:read', 'employees:create', 'employees:update', 'employees:delete',
          'attendance:read', 'attendance:manage',
          'leaves:read', 'leaves:approve', 'leaves:reject',
          'payroll:read', 'payroll:manage',
          'projects:read'
        ],
        organizationId: '1'
      };
    } else if (token.includes('mock-employee-token')) {
      user = {
        id: '3',
        name: 'John Employee',
        email: 'employee@example.com',
        role: 'employee',
        permissions: [
          'profile:read', 'profile:update',
          'attendance:read', 'attendance:mark',
          'leaves:read', 'leaves:request',
          'payroll:read',
          'projects:read'
        ],
        organizationId: '1'
      };
    } else {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    return res.json(user);
  }
  
  // Mock endpoint for UI navigation config
  if (req.path === '/ui/navigation' && req.method === 'GET') {
    const { role } = req.query;
    
    if (!role) {
      return res.status(400).json({ error: 'Role parameter is required' });
    }
    
    // Read from db.json
    const db = req._db || {};
    const navigationConfig = db.uiConfig?.navigation?.[role] || [];
    
    return res.json(navigationConfig);
  }
  
  // Mock endpoint for dashboard config
  if (req.path === '/ui/dashboard' && req.method === 'GET') {
    const { role } = req.query;
    
    if (!role) {
      return res.status(400).json({ error: 'Role parameter is required' });
    }
    
    // Read from db.json
    const db = req._db || {};
    const dashboardConfig = db.uiConfig?.dashboard?.[role] || [];
    
    return res.json(dashboardConfig);
  }
  
  // Mock endpoint for form config
  if (req.path.startsWith('/ui/forms/') && req.method === 'GET') {
    const formId = req.path.split('/').pop();
    
    if (!formId) {
      return res.status(400).json({ error: 'Form ID is required' });
    }
    
    // Read from db.json
    const db = req._db || {};
    const formConfig = db.uiConfig?.forms?.[formId];
    
    if (!formConfig) {
      return res.status(404).json({ error: 'Form configuration not found' });
    }
    
    return res.json(formConfig);
  }
  
  // Mock endpoint for table config
  if (req.path.startsWith('/ui/tables/') && req.method === 'GET') {
    const tableId = req.path.split('/').pop();
    
    if (!tableId) {
      return res.status(400).json({ error: 'Table ID is required' });
    }
    
    // Read from db.json
    const db = req._db || {};
    const tableConfig = db.uiConfig?.tables?.[tableId];
    
    if (!tableConfig) {
      return res.status(404).json({ error: 'Table configuration not found' });
    }
    
    return res.json(tableConfig);
  }
  
  // Mock dashboard data endpoints
  if (req.path.startsWith('/api/dashboard/')) {
    const dataType = req.path.split('/').pop();
    
    if (dataType === 'employee-stats') {
      return res.json({
        stats: [
          { label: 'Total Employees', value: '43' },
          { label: 'Active', value: '39' },
          { label: 'On Leave', value: '2' },
          { label: 'New This Month', value: '3' }
        ]
      });
    }
    
    if (dataType === 'recent-leaves') {
      return res.json({
        headers: ['Employee', 'Type', 'From', 'To', 'Status'],
        rows: [
          ['John Doe', 'Annual Leave', format(new Date(), 'MMM dd, yyyy'), format(addDays(new Date(), 3), 'MMM dd, yyyy'), 'Approved'],
          ['Jane Smith', 'Sick Leave', format(addDays(new Date(), 1), 'MMM dd, yyyy'), format(addDays(new Date(), 2), 'MMM dd, yyyy'), 'Pending'],
          ['Robert Johnson', 'Annual Leave', format(addDays(new Date(), 5), 'MMM dd, yyyy'), format(addDays(new Date(), 10), 'MMM dd, yyyy'), 'Pending']
        ]
      });
    }
    
    if (dataType === 'department-headcount') {
      return res.json({
        chartData: {
          labels: ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales'],
          datasets: [
            {
              label: 'Employees',
              data: [15, 8, 6, 4, 10],
              backgroundColor: '#0F52BA',
            }
          ]
        }
      });
    }
    
    if (dataType === 'attendance-trend') {
      return res.json({
        chartData: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Present',
              data: [40, 39, 38, 40, 36, 10, 5],
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.3,
            },
            {
              label: 'Absent',
              data: [3, 4, 5, 3, 7, 0, 0],
              borderColor: '#DC2626',
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              tension: 0.3,
            }
          ]
        }
      });
    }
    
    if (dataType === 'my-attendance') {
      return res.json({
        stats: [
          { label: 'Present', value: '22' },
          { label: 'Late', value: '3' },
          { label: 'Absent', value: '1' },
          { label: 'Leave', value: '2' }
        ]
      });
    }
    
    if (dataType === 'my-leave-balance') {
      return res.json({
        stats: [
          { label: 'Annual Leave', value: '15' },
          { label: 'Sick Leave', value: '8' },
          { label: 'Used', value: '5' },
          { label: 'Pending', value: '2' }
        ]
      });
    }
    
    if (dataType === 'my-tasks') {
      return res.json({
        items: [
          { title: 'Complete project proposal', description: 'Due in 2 days', value: 'High' },
          { title: 'Review code changes', description: 'Pull request #24', value: 'Medium' },
          { title: 'Team meeting', description: 'Tomorrow at 10:00 AM', value: 'Normal' },
          { title: 'Update documentation', description: 'Due next week', value: 'Low' }
        ]
      });
    }
    
    if (dataType === 'upcoming-holidays') {
      return res.json({
        items: [
          { title: 'Memorial Day', description: format(addDays(new Date(), 5), 'MMM dd, yyyy') },
          { title: 'Independence Day', description: format(addDays(new Date(), 30), 'MMM dd, yyyy') },
          { title: 'Labor Day', description: format(addDays(new Date(), 60), 'MMM dd, yyyy') }
        ]
      });
    }
  }
  
  // Mock API endpoints for employees with pagination and filtering
  if (req.path === '/api/employees' && req.method === 'GET') {
    const db = req._db || {};
    const employees = db.employees || [];
    const departments = db.departments || [];
    
    // Add department names to employees
    const enrichedEmployees = employees.map(employee => {
      const department = departments.find(d => d.id === employee.departmentId);
      return {
        ...employee,
        departmentName: department?.name || 'Unknown'
      };
    });
    
    // Parse query parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const status = req.query.status;
    const departmentId = req.query.departmentId;
    const search = req.query.search?.toLowerCase();
    
    // Apply filters
    let filteredEmployees = [...enrichedEmployees];
    
    if (status) {
      filteredEmployees = filteredEmployees.filter(employee => employee.status === status);
    }
    
    if (departmentId) {
      filteredEmployees = filteredEmployees.filter(employee => employee.departmentId === departmentId);
    }
    
    if (search) {
      filteredEmployees = filteredEmployees.filter(employee => 
        employee.firstName.toLowerCase().includes(search) ||
        employee.lastName.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search) ||
        employee.jobTitle.toLowerCase().includes(search)
      );
    }
    
    // Calculate pagination
    const totalItems = filteredEmployees.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
    
    return res.json({
      data: paginatedEmployees,
      page,
      pageSize,
      totalItems,
      totalPages
    });
  }
  
  // Mock API endpoint for leaves with pagination and filtering
  if (req.path === '/api/leaves' && req.method === 'GET') {
    const db = req._db || {};
    const leaves = db.leaves || [];
    const employees = db.employees || [];
    const leaveTypes = db.leaveTypes || [];
    
    // Enrich leave data
    const enrichedLeaves = leaves.map(leave => {
      const employee = employees.find(e => e.id === leave.employeeId);
      const leaveType = leaveTypes.find(lt => lt.id === leave.leaveTypeId);
      
      // Calculate duration
      const duration = differenceInDays(new Date(leave.endDate), new Date(leave.startDate)) + 1;
      
      return {
        ...leave,
        employeeName: employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown',
        leaveType: leaveType?.name || 'Unknown',
        duration: `${duration} day${duration !== 1 ? 's' : ''}`
      };
    });
    
    // Parse query parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const status = req.query.status;
    const leaveTypeId = req.query.leaveTypeId;
    const search = req.query.search?.toLowerCase();
    
    // Apply filters
    let filteredLeaves = [...enrichedLeaves];
    
    if (status) {
      filteredLeaves = filteredLeaves.filter(leave => leave.status === status);
    }
    
    if (leaveTypeId) {
      filteredLeaves = filteredLeaves.filter(leave => leave.leaveTypeId === leaveTypeId);
    }
    
    if (search) {
      filteredLeaves = filteredLeaves.filter(leave => 
        leave.employeeName.toLowerCase().includes(search) ||
        leave.leaveType.toLowerCase().includes(search) ||
        leave.reason.toLowerCase().includes(search)
      );
    }
    
    // Calculate pagination
    const totalItems = filteredLeaves.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedLeaves = filteredLeaves.slice(startIndex, endIndex);
    
    return res.json({
      data: paginatedLeaves,
      page,
      pageSize,
      totalItems,
      totalPages
    });
  }
  
  // Continue to JSON Server's default handler
  next();
};