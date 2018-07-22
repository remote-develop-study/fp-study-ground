const redis = require('../database');

const list = async (req, res, next) => {
  const allTodoItems = await redis.getTodoItems();
  res.json(allTodoItems);
  res.end();
};

const post = async (req, res, next) => {
  const { whatTodo } = req.body;
  const redisHashSet = { whatTodo, completed: 'false' };
  if (await redis.setTodoItem(redisHashSet)) {
    next();
  } else {
    res.status(500).send(false);
  }
};

module.exports = {
  list,
  post
};