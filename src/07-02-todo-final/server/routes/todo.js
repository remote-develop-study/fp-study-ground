const todoAPIRouter = require('express').Router();
const todoController = require('../controllers/todo-controller');

todoAPIRouter.get('/', todoController.list);

todoAPIRouter.post('/', todoController.post, (req, res) => {
  res.status(200).end();
});

module.exports = todoAPIRouter;