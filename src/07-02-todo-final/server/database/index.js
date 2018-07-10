const Redis = require('ioredis');
const zipObject = require('lodash/zipObject');
const redis = new Redis();

exports.setTodoItem = async (todoItem) => {
  const { whatTodo, completed } = todoItem;
  console.log(todoItem);
  try {
    await redis.set(whatTodo, completed);
    return true;
  } catch (error) {
    return error
  }
};

exports.getTodoItems = async () => {
  const allTodos = await redis.keys('*');
  try {
    const allTodoStatus = allTodos.length ?  await redis.mget(allTodos) : [];
    return zipObject(allTodos, allTodoStatus);
  } catch (error) {
    return error
  }
};