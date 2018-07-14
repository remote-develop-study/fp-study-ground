import createLiTag from './createLiTag.js';
import updateLeftItemsCount from './updateLeftItemsCount.js';

export default function(kind) {
  return () => {
    const ulTag = document.querySelector('ul.todo-list');
    Array.from(document.querySelectorAll('ul.filters li a')).forEach((aTag) => {
      aTag.className = '';
      if (aTag.innerHTML === kind) aTag.className = 'selected';
    });
    Array.from(document.querySelectorAll('ul.todo-list li')).forEach((li) => ulTag.removeChild(li));
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.filter((todo) => {
      if(kind === 'All') return true;
      if(kind === 'Active') return todo.status === '';
      if(kind === 'Completed') return todo.status === 'completed';
    })
    .map((todo) => createLiTag(todo.id, todo.status, todo.status === 'completed', todo.value))
    .forEach((li) => ulTag.appendChild(li));
    updateLeftItemsCount();
  };
}