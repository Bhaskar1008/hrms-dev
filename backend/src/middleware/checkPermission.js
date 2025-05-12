import Role from '../models/Role.js';

export const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {
      // Admin role has all permissions
      if (req.user.role === 'admin') {
        return next();
      }

      const role = await Role.findOne({ name: req.user.role });
      if (!role) {
        return res.status(403).json({ message: 'Role not found' });
      }

      const modulePermission = role.permissions.find(p => p.module === module);
      if (!modulePermission || !modulePermission.actions[action]) {
        return res.status(403).json({ 
          message: 'You do not have permission to perform this action' 
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
};