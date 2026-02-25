const todoRepository = require('./todo.repository');

exports.createTodo = async (task, userId) => {
  return await todoRepository.create(task, userId);
};

exports.getAllTodos = async (userId) => {
  return await todoRepository.findAll(userId);
};

exports.updateTodo = async (id, completed, userId) => {
  return await todoRepository.update(id, completed, userId);
};

exports.deleteTodo = async (id, userId) => {
  return await todoRepository.remove(id, userId);
};