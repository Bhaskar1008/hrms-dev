import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, authorize } from '../middleware/auth.js';
import Role from '../models/Role.js';
import User from '../models/User.js';

const router = express.Router();

// Validation middleware
const roleValidation = [
  body('name').notEmpty().trim(),
  body('permissions').isArray(),
  body('permissions.*.module').notEmpty(),
  body('permissions.*.actions').isObject(),
];

// Get all roles
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const roles = await Role.find()
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new role
router.post('/', auth, authorize('admin'), roleValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, permissions } = req.body;

    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    const role = new Role({
      name,
      description,
      permissions,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update role
router.patch('/:id', auth, authorize('admin'), roleValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    if (role.isSystem) {
      return res.status(400).json({ message: 'System roles cannot be modified' });
    }

    const { name, description, permissions, isActive } = req.body;

    // Check if new name conflicts with existing role
    if (name !== role.name) {
      const existingRole = await Role.findOne({ name });
      if (existingRole) {
        return res.status(400).json({ message: 'Role name already exists' });
      }
    }

    Object.assign(role, {
      name,
      description,
      permissions,
      isActive,
      updatedBy: req.user._id,
    });

    await role.save();
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete role
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    if (role.isSystem) {
      return res.status(400).json({ message: 'System roles cannot be deleted' });
    }

    // Check if role is assigned to any users
    const usersWithRole = await User.countDocuments({ role: role.name });
    if (usersWithRole > 0) {
      return res.status(400).json({ 
        message: 'Role is assigned to users and cannot be deleted' 
      });
    }

    await role.deleteOne();
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;