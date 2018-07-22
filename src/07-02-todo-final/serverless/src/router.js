import { getHandler, postHandler } from './handler';


const get = (event, ctx, callback) => getHandler(event, ctx, callback);
const post = (event, ctx, callback) => postHandler(event, ctx, callback);
const patch = (event, ctx, callback) => {};
const remove = (event, ctx, callback) => {};


export {
  get,
  post,
  patch,
  remove,
};
