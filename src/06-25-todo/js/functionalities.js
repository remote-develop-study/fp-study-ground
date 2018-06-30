// Application setting
(() => {
  // For the input tag
  const inputTag = document.querySelector('input.new-todo');
  inputTag.addEventListener('keyup', onChange);

  // For the spanTag tag
  updateLeftItemsCount();

  // For the filters buttons tag
  const filtersATags = Array.from(document.querySelectorAll('ul.filters li a'));
  const allA = filtersATags.find((a) => a.innerHTML === 'All');
  const activeA = filtersATags.find((a) => a.innerHTML === 'Active');
  const completedA = filtersATags.find((a) => a.innerHTML === 'Completed');
  allA.addEventListener('click', selectAll);
  activeA.addEventListener('click', selectActive);
  completedA.addEventListener('click', selectCompleted);

  // For the clear button tag
  const clearButtonTag = document.querySelector('button.clear-completed');
  clearButtonTag.addEventListener('click', clearCompletedTodos);

  // Render all todos from storage
  selectAll();
})();

// State machine with closure
const store = (() => {
  localStorage.setItem('autoIncrementedId', localStorage.getItem('autoIncrementedId') || 0);

  return {
    generateId() {
      const id = Number(localStorage.getItem('autoIncrementedId'));
      localStorage.setItem('autoIncrementedId', id + 1);
      return id;
    }
  };
})();

// Update count of left items
function updateLeftItemsCount() {
  const spanTag = document.querySelector('span.todo-count');
  // const leftItemsCount = Array.from(document.querySelectorAll('ul.todo-list li'))
  //   .filter((li) => li.className === '')
  //   .length;
  const leftItemsCount = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos'))
      .filter((todo) => todo.status === '')
      .length
    :
    0;
  spanTag.innerHTML = `${leftItemsCount} ${leftItemsCount <= 1 ? 'item' : 'items'} left`;
}

// Input tag onchange handler
function onChange(e) {
  if(e.key === 'Enter') {
    // VALIDATION
    if(e.target.value === '') return alert('Write what you need to do.');

    addTodo(e.target.value);
    e.target.value = '';
  }
}

// Add a todo
function addTodo(value) {
  const ulTag = document.querySelector('ul.todo-list');

  // Create tags for a li tag
  const liTag = document.createElement('li');
  const divTag = document.createElement('div');
  const inputTag = document.createElement('input');
  const labelTag = document.createElement('label');
  const buttonTag = document.createElement('button');

  // Tags setting
  const liId = store.generateId();
  liTag.setAttribute('data-id', liId);
  divTag.className = 'view';
  inputTag.type = 'checkbox';
  inputTag.className = 'toggle';
  inputTag.addEventListener('click', () => { // Done click
    const currentClass = liTag.className;
    if(currentClass === 'completed') {
      liTag.className = '';
    } else {
      liTag.className = 'completed';
    }

    // Update count
    updateLeftItemsCount();

    // Update storage
    const todos = JSON.parse(localStorage.getItem('todos'))
      .map((todo) => {
        if(Number(todo.id) === liId) {
          if(todo.status === 'completed') {
            todo.status = '';
          } else {
            todo.status = 'completed';
          }
        }
        return todo;
      });
    localStorage.setItem('todos', JSON.stringify(todos));
  });
  labelTag.innerHTML = value;
  buttonTag.className = 'destroy';
  buttonTag.addEventListener('click', () => { // Delete click
    ulTag.removeChild(liTag);
    updateLeftItemsCount();

    // Delete a todo from storage
    const todos = JSON.parse(localStorage.getItem('todos'))
      .filter((todo) => todo.id !== liId);
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  // Save the created todo to storage
  saveTodo({
    id: liId,
    value,
    status: ''
  });

  // Attach created tags to the ul tag
  divTag.appendChild(inputTag);
  divTag.appendChild(labelTag);
  divTag.appendChild(buttonTag);
  liTag.appendChild(divTag);
  ulTag.appendChild(liTag);

  // Update count
  updateLeftItemsCount();
}

// Select all button
function selectAll() {
  // Update all button class
  const filtersATags = Array.from(document.querySelectorAll('ul.filters li a'));
  const allA = filtersATags.find((a) => a.innerHTML === 'All');
  const activeA = filtersATags.find((a) => a.innerHTML === 'Active');
  const completedA = filtersATags.find((a) => a.innerHTML === 'Completed');
  allA.className = 'selected';
  activeA.className = '';
  completedA.className = '';

  const ulTag = document.querySelector('ul.todo-list');

  // Remove all li tags
  Array.from(document.querySelectorAll('ul.todo-list li'))
    .forEach((li) => ulTag.removeChild(li));
  
  // Render all todos
  const todosFromStorage = localStorage.getItem('todos');
  if(!todosFromStorage) return;
  JSON.parse(todosFromStorage)
    .map((todo) => {
      const liTag = document.createElement('li');
      const divTag = document.createElement('div');
      const inputTag = document.createElement('input');
      const labelTag = document.createElement('label');
      const buttonTag = document.createElement('button');

      const liId = todo.id;
      liTag.setAttribute('data-id', liId);
      liTag.className = todo.status;
      divTag.className = 'view';
      inputTag.type = 'checkbox';
      inputTag.className = 'toggle';
      if(todo.status === 'completed') inputTag.checked = true;
      inputTag.addEventListener('click', () => {
        const currentClass = liTag.className;
        if(currentClass === 'completed') {
          liTag.className = '';
        } else {
          liTag.className = 'completed';
        }

        // Update count
        updateLeftItemsCount();

        // Update storage
        const todos = JSON.parse(localStorage.getItem('todos'))
          .map((todo) => {
            if(Number(todo.id) === liId) {
              if(todo.status === 'completed') {
                todo.status = '';
              } else {
                todo.status = 'completed';
              }
            }
            return todo;
          });
        localStorage.setItem('todos', JSON.stringify(todos));
      });
      labelTag.innerHTML = todo.value;
      buttonTag.className = 'destroy';
      buttonTag.addEventListener('click', () => {
        ulTag.removeChild(liTag);
        updateLeftItemsCount();

        // Delete a todo from storage
        const todos = JSON.parse(localStorage.getItem('todos'))
          .filter((todo) => todo.id !== liId);
        localStorage.setItem('todos', JSON.stringify(todos));
      });

      divTag.appendChild(inputTag);
      divTag.appendChild(labelTag);
      divTag.appendChild(buttonTag);
      liTag.appendChild(divTag);
      ulTag.appendChild(liTag);

      return liTag;
    })
    .sort((a, b) => Number(a.id) - Number(b.id))
    .forEach((todo) => ulTag.appendChild(todo));

  // Update count
  updateLeftItemsCount();
}

// Select active button
function selectActive() {
  // Update active button class
  const filtersATags = Array.from(document.querySelectorAll('ul.filters li a'));
  const allA = filtersATags.find((a) => a.innerHTML === 'All');
  const activeA = filtersATags.find((a) => a.innerHTML === 'Active');
  const completedA = filtersATags.find((a) => a.innerHTML === 'Completed');
  allA.className = '';
  activeA.className = 'selected';
  completedA.className = '';

  const ulTag = document.querySelector('ul.todo-list');

  // Remove all li tags
  Array.from(document.querySelectorAll('ul.todo-list li'))
    .forEach((li) => ulTag.removeChild(li));
  
  // Render active todos
  const todosFromStorage = localStorage.getItem('todos');
  if(!todosFromStorage) return;
  JSON.parse(todosFromStorage)
    .filter((todo) => todo.status === '')
    .map((todo) => {
      const liTag = document.createElement('li');
      const divTag = document.createElement('div');
      const inputTag = document.createElement('input');
      const labelTag = document.createElement('label');
      const buttonTag = document.createElement('button');

      const liId = todo.id;
      liTag.setAttribute('data-id', liId);
      liTag.className = todo.status;
      divTag.className = 'view';
      inputTag.type = 'checkbox';
      inputTag.className = 'toggle';
      if(todo.status === 'completed') inputTag.checked = true;
      inputTag.addEventListener('click', () => {
        const currentClass = liTag.className;
        if(currentClass === 'completed') {
          liTag.className = '';
        } else {
          liTag.className = 'completed';
        }

        updateLeftItemsCount();
      });
      labelTag.innerHTML = todo.value;
      buttonTag.className = 'destroy';
      buttonTag.addEventListener('click', () => {
        ulTag.removeChild(liTag);
        updateLeftItemsCount();

        // Delete a todo from storage
        const todos = JSON.parse(localStorage.getItem('todos'))
          .filter((todo) => todo.id !== liId);
        localStorage.setItem('todos', JSON.stringify(todos));
      });

      divTag.appendChild(inputTag);
      divTag.appendChild(labelTag);
      divTag.appendChild(buttonTag);
      liTag.appendChild(divTag);
      ulTag.appendChild(liTag);

      return liTag;
    })
    .sort((a, b) => Number(a.id) - Number(b.id))
    .forEach((todo) => ulTag.appendChild(todo));

  // Update count
  updateLeftItemsCount();
}

// Select completed button
function selectCompleted() {
  // Update completed button class
  const filtersATags = Array.from(document.querySelectorAll('ul.filters li a'));
  const allA = filtersATags.find((a) => a.innerHTML === 'All');
  const activeA = filtersATags.find((a) => a.innerHTML === 'Active');
  const completedA = filtersATags.find((a) => a.innerHTML === 'Completed');
  allA.className = '';
  activeA.className = '';
  completedA.className = 'selected';

  const ulTag = document.querySelector('ul.todo-list');

  // Remove all li tags
  Array.from(document.querySelectorAll('ul.todo-list li'))
    .forEach((li) => ulTag.removeChild(li));
  
  // Render completed todos
  const todosFromStorage = localStorage.getItem('todos');
  if(!todosFromStorage) return;
  JSON.parse(todosFromStorage)
    .filter((todo) => todo.status === 'completed')
    .map((todo) => {
      const liTag = document.createElement('li');
      const divTag = document.createElement('div');
      const inputTag = document.createElement('input');
      const labelTag = document.createElement('label');
      const buttonTag = document.createElement('button');

      const liId = todo.id;
      liTag.setAttribute('data-id', liId);
      liTag.className = todo.status;
      divTag.className = 'view';
      inputTag.type = 'checkbox';
      inputTag.className = 'toggle';
      if(todo.status === 'completed') inputTag.checked = true;
      inputTag.addEventListener('click', () => {
        const currentClass = liTag.className;
        if(currentClass === 'completed') {
          liTag.className = '';
        } else {
          liTag.className = 'completed';
        }

        updateLeftItemsCount();
      });
      labelTag.innerHTML = todo.value;
      buttonTag.className = 'destroy';
      buttonTag.addEventListener('click', () => {
        ulTag.removeChild(liTag);
        updateLeftItemsCount();

        // Delete a todo from storage
        const todos = JSON.parse(localStorage.getItem('todos'))
          .filter((todo) => todo.id !== liId);
        localStorage.setItem('todos', JSON.stringify(todos));
      });

      divTag.appendChild(inputTag);
      divTag.appendChild(labelTag);
      divTag.appendChild(buttonTag);
      liTag.appendChild(divTag);
      ulTag.appendChild(liTag);

      return liTag;
    })
    .sort((a, b) => Number(a.id) - Number(b.id))
    .forEach((todo) => ulTag.appendChild(todo));

  // Update count
  updateLeftItemsCount();
}

// Save a todo to storage
function saveTodo(todo) {
  const todos = localStorage.getItem('todos');

  if(!todos) {
    localStorage.setItem('todos', JSON.stringify([todo]));
  } else {
    localStorage.setItem('todos', JSON.stringify([...JSON.parse(todos), todo]));
  }
}

function clearCompletedTodos() {
  // Delete completed todos from storage
  const todos = JSON.parse(localStorage.getItem('todos'))
    .filter((todo) => todo.status !== 'completed');
  localStorage.setItem('todos', JSON.stringify(todos));

  // Update UI
  const filtersATags = Array.from(document.querySelectorAll('ul.filters li a'));
  const currentA = filtersATags.find((a) => a.className === 'selected');
  const clickEvent = new Event('click');
  currentA.dispatchEvent(clickEvent);
}
