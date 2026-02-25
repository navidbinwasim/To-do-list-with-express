const express = require('express');
const router = express.Router();
const todoController = require('./todo.controller');
const auth = require('../../middleware/auth.middleware');

// Protect all todo routes - user must be authenticated
router.use(auth);

router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;