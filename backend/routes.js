// const express = require('express');
// const router = express.Router();
// const getAllTodos = require('./handlers');
// const getOneTodo = require('./handlers');
// const addTodo = require('./handlers');

// router.get('/todos', async (req, res) => {
//    const todos = await getAllTodos();
//    return res.json({ succes: true, todos });
// });

// router.post('/insert', async (req, res) => {
//    const { title } = req.body;
//    const addedTodo = await addTodo(title);
//    return res.json({ succes: true, addedTodo });
// });

// router.get('/todo/:id', async (req, res) => {
//    const todoId = req.params.id;
//    const todo = await getOneTodo(todoId);
//    return res.json({ succes: true, todo });
// });

// module.exports = router;
