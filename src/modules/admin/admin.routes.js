const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const auth = require('../../middleware/auth.middleware');
const admin = require('../../middleware/admin.middleware');

// protect all admin routes
router.use(auth);
router.use(admin);

router.get('/users', adminController.listUsers);
router.get('/users/:id/todos', adminController.getUserTodos);
router.put('/users/:id/role', adminController.changeUserRole);
router.delete('/todos/:id', adminController.deleteTodo);

// User management
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id/disable', adminController.disableUser);
router.post('/users/:id/reset-password', adminController.resetPassword);

module.exports = router;
