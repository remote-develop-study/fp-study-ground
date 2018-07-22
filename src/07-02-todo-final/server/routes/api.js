const apiRouter = require('express').Router();
const todoAPIRouter = require('./todo');


apiRouter.use('/todo', todoAPIRouter);

module.exports = apiRouter;
