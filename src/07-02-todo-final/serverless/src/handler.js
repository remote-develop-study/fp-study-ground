import { TodoItem, User } from '../models/model';

const eventHelper = {
  response: (statusCode, responseData) => ({
    statusCode,
    body: JSON.stringify(responseData),
  }),

  parseBody: (event) => {
    const { body } = event;
    return JSON.parse(body);
  },
};

const getHandler = async (event, ctx, callback) => {
  const { userID } = event.pathParameters;
  const result = await User.find({ userID });
  return result.length ? eventHelper.response(200, result) : eventHelper.response(404, result);
};


const postHandler = async (event, ctx, callback) => {
  const { userID, todoItem } = eventHelper.parseBody(event);
  const todo = new TodoItem({ ...todoItem });
  const updatedUser = await User.findOneAndUpdate(
    { userID },
    { $push: { todoItems: todo } },
    { new: true }, // return the modified document rather than the original. defaults to false
  );
  if (updatedUser) {
    updatedUser.save();
    return eventHelper.response(200, updatedUser);
  }
  return eventHelper.response(404, 'User Not Found');
};


export {
  getHandler,
  postHandler,
};
