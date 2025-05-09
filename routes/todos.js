
const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

router.post('/', todosController.createTodo);
router.get('/', todosController.getAllTodos);
router.get('/stats', todosController.getTodoStats);
router.get('/:id', todosController.getTodoById);
router.put('/:id', todosController.updateTodo);
router.delete('/:id', todosController.deleteTodo);

module.exports = router;
