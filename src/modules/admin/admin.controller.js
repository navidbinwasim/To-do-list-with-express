const adminService = require('./admin.service');

exports.listUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserTodos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await adminService.getUserTodos(id);
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

exports.changeUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await adminService.setUserRole(id, role);
    res.json({ message: 'Role updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adminService.deleteTodoAny(id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

exports.disableUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { disabled } = req.body;
    await adminService.setUserDisabled(id, disabled);
    res.json({ message: 'User updated' });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    await adminService.resetUserPassword(id, password);
    res.json({ message: 'Password reset' });
  } catch (err) {
    next(err);
  }
};
