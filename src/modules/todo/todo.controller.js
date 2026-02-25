const todoService = require('./todo.service');

exports.createTodo = async (req, res, next) => {
  try {
    const { task } = req.body;
    const userId = req.user && req.user.id;
    const todo = await todoService.createTodo(task, userId);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    const todos = await todoService.getAllTodos(userId);
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const userId = req.user && req.user.id;
    await todoService.updateTodo(id, completed, userId);
    res.json({ message: 'Todo Updated' });
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user && req.user.id;
    await todoService.deleteTodo(id, userId);
    res.json({ message: 'Todo Deleted' });
  } catch (error) {
    next(error);
  }
};