import updateLeftItemsCount from './updateLeftItemsCount.js';

export default function (id, status, completed, value) {
  const liTag = document.createElement('li');
  const divTag = document.createElement('div');
  const inputTag = document.createElement('input');
  const labelTag = document.createElement('label');
  const buttonTag = document.createElement('button');

  liTag.setAttribute('data-id', id);
  liTag.className = status;
  divTag.className = 'view';
  inputTag.type = 'checkbox';
  inputTag.className = 'toggle';
  if(completed) inputTag.checked = true;
  inputTag.addEventListener('click', () => {
    liTag.classList.toggle('completed');
    const todos = JSON.parse(localStorage.getItem('todos')).map((todo) => {
      if(Number(todo.id) === id) {
        if(todo.status === 'completed') todo.status = '';
        if(todo.status !== 'completed') todo.status = 'completed';
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    updateLeftItemsCount();
  });
  labelTag.innerHTML = value;
  buttonTag.className = 'destroy';
  buttonTag.addEventListener('click', () => {
    document.querySelector('ul.todo-list').removeChild(liTag);
    const todos = JSON.parse(localStorage.getItem('todos'))
      .filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    updateLeftItemsCount();
  });

  divTag.appendChild(inputTag);
  divTag.appendChild(labelTag);
  divTag.appendChild(buttonTag);
  liTag.appendChild(divTag);
  return liTag;
};