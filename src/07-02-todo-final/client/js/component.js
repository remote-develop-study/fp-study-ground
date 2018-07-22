const todoItemComponent = todo => `
  <li class="todo-item">
    <input type="checkbox" name="todo" id="${todo.id}">
    <label class="todo-item-label ${todo.completed ? 'completed' : ''}" for="${todo.id}">${todo.whatTodo}</label>
  </li>
`;

const todoItemCounts = length => `
  <span class="todo-count"><strong>${length}</strong> items left</span>
`;

export {
  todoItemComponent,
  todoItemCounts
}
