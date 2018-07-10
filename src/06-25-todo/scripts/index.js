// import { Todo } from './template';
// import { $todoContainer, $prompt } from './controllers';
import style from '../static/main.css';

// const addNewTodo = (target, todo) => {
//   console.log(todo);
//   const range = document.createRange();
//   range.selectNode(target);
//   const todoFragment = range.createContextualFragment(todo.component);
//   target.appendChild(todoFragment);
// };
//
// $prompt.addEventListener('keypress', event => {
//   const text = event.target.value;
//   event.preventDefault();
//   if (event.keyCode === 13 && text.length) {
//     const todo = new Todo(event.target.value);
//     addNewTodo($todoContainer, todo);
//     localStorage.setItem(todo.id, todo.whatTodo);
//     event.target.value = null;
//   }
// });