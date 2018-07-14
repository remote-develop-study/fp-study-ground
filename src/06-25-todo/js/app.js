import createStore from './createStore.js';
import makeHandler from './makeHandler.js';
import createLiTag from './createLiTag.js';
import updateLeftItemsCount from './updateLeftItemsCount.js';

// Store
const store = createStore();

// DOM Binding
(() => {
  const inputTag = document.querySelector('input.new-todo');
  const aTags = document.querySelectorAll('ul.filters li a');
  const clearButtonTag = document.querySelector('button.clear-completed');

  inputTag.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
      if(e.target.value === '') return alert('Write what you need to do.');
      const liId = store.generateId();
      const liTag = createLiTag(liId, '', false, e.target.value);
      document.querySelector('ul.todo-list').appendChild(liTag);

      const todos = localStorage.getItem('todos');
      const todo = { id: liId, value: e.target.value, status: '' };
      todos ?
        localStorage.setItem('todos', JSON.stringify([...JSON.parse(todos), todo]))
        :
        localStorage.setItem('todos', JSON.stringify([todo]));
      e.target.value = '';
      updateLeftItemsCount();
    }
  });
  aTags[0].addEventListener('click', makeHandler('All'));
  aTags[1].addEventListener('click', makeHandler('Active'));
  aTags[2].addEventListener('click', makeHandler('Completed'));
  clearButtonTag.addEventListener('click', (e) => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    localStorage.setItem('todos', JSON.stringify(todos.filter((todo) => todo.status !== 'completed')));
    document.querySelector('ul.filters li a.selected').dispatchEvent(new Event('click'));
  });
})();

// Initial rendering
(() => {
  updateLeftItemsCount();
  makeHandler('All')();
})()
