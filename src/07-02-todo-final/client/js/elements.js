// Only for a single element
const ELEMENT = {
  $todoInput: document.querySelector('.new-todo'),
  $toggleAllBtn: document.querySelector('#toggle-all'),
  $todoContainer: document.querySelector('.todo-list'),
  $filterButtonContainer: document.querySelector('ul.filters'),
  $activeBtn: document.querySelector('.btn-active'),
  $completedBtn: document.querySelector('.btn-completed'),
  $clearAllBtn: document.querySelector('button.btn-clear-completed'),
};

// Only for array of elements
const ELEMENTS = {
  $filterButtons: document.querySelectorAll('ul.filters li button'),
  $todoItems: () => document.querySelectorAll('.todo-item'),
  $activatedTodoItems: () => document.querySelectorAll('.todo-item:not(.completed)'),
  $completedTodoItems: () => document.querySelectorAll('.todo-item.completed'),
};

export {
  ELEMENTS,
  ELEMENT
}