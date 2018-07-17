import { TodoItem, User } from '../models/model';


const response = (statusCode, responseData) => ({
  statusCode,
  body: JSON.stringify(responseData),
});

const parseBody = (event) => {
  const { body } = event;
  return JSON.parse(body);
};

const get = async (event, context, callback) => {
  const { userID } = event.pathParameters;
  const result = await User.find({ userID });
  return result.length ? response(200, result) : response(404, result);
};

const post = async (event, context, callback) => {
};

const patch = (event, context, callback) => {
};

const remove = (event, context, callback) => {

};


export {
  get,
  post,
  patch,
  remove,
};
