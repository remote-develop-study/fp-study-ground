import mongoose from 'mongoose';
import Kitten from '../models/kitty';


const response = (statusCode, responseData) => ({
  statusCode,
  body: JSON.stringify(responseData),
});

const parseBody = (event) => {
  const { body } = event;
  return JSON.parse(body);
};

const get = async (event, context, callback) => {
  await mongoose.connect('mongodb://todo:xnenrhksflwk@localhost/todo');
  const doondoon = new Kitten({ name: 'doondoon' });
  doondoon.save();
  doondoon.speak();

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
