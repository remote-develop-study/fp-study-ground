import mongoose from '../src/database';

const { Schema } = mongoose;

const todoItemSchema = new Schema({
  id: Number,
  whatTodo: String,
  completed: Boolean,
});

const userSchema = new Schema({
  userID: String,
  todoItems: {
    type: [todoItemSchema],
    required: false,
    default: [],
  },
});

class TodoItemClass {
  undone() {
    this.completed = false;
  }

  done() {
    this.completed = true;
  }
}

class UserClass {
  emptyTodoItems() {
    this.todoItems = [];
  }

  allTodoItemsDone() {
    // eslint-disable-next-line no-param-reassign
    this.todoItems.forEach(v => v.completed = true);
  }
}

todoItemSchema.loadClass(TodoItemClass);
userSchema.loadClass(UserClass);

const TodoItem = mongoose.models.TodoItem || mongoose.model('TodoItem', todoItemSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export {
  TodoItem,
  User,
};
