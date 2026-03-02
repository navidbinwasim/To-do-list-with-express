const authRepository = require('../auth/auth.repository');
const todoRepository = require('../todo/todo.repository');
const pool = require('../../config/db');
const bcrypt = require('bcrypt');

exports.getAllUsers = async () => {
  return await authRepository.findAll();
};

exports.getUserTodos = async (userId) => {
  return await todoRepository.findAll(userId);
};

exports.setUserRole = async (userId, role) => {
  await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, userId]);
};

exports.deleteTodoAny = async (todoId) => {
  return await todoRepository.removeAny(todoId);
};

exports.deleteUser = async (userId) => {
  // delete user's todos first to avoid FK issues
  await pool.query('DELETE FROM todos WHERE user_id = $1', [userId]);
  await authRepository.deleteUser(userId);
};

exports.setUserDisabled = async (userId, disabled) => {
  await authRepository.setDisabled(userId, disabled);
};

exports.resetUserPassword = async (userId, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  await authRepository.updatePassword(userId, hashed);
};
