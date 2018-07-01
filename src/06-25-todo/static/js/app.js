const writeField = document.getElementById('todoWriteField');
const list = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompleted');
const store = localStorage;
let num = 0;

const todoAdd = (work) => {
  const item = document.createElement('li');

  const itemCover = document.createElement('div');
  itemCover.classList.add('view');

  const textBox = document.createElement('label');
  textBox.innerText = work;

  textBox.addEventListener('dblclick', modifyTodo);

  const completeBtn = document.createElement('input');
  completeBtn.type = 'checkbox';
  completeBtn.classList.add('toggle');

  completeBtn.addEventListener('click', completeTodo);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('destroy');

  deleteBtn.addEventListener('click', removeTodo);

  clearCompletedBtn.addEventListener('click', deleteCompleteTodo);

  itemCover.appendChild(completeBtn);
  itemCover.appendChild(textBox);
  itemCover.appendChild(deleteBtn);

  item.appendChild(itemCover);
  list.insertBefore(item, list.childNodes[0]);

  store.setItem(num + 1, work);
  num++;
  writeField.value = '';
};

const removeTodo = (e) => {
  list.removeChild(e.target.parentNode.parentNode);
};

const completeTodo = (e) => {
  e.target.parentNode.parentNode.classList.toggle('completed');
};

const modifyTodo = (e) => {
  e.target.parentNode.parentNode.classList.add('editing');
  const editFiled = document.createElement('input');
  editFiled.classList.add('edit');

  editFiled.value = e.target.parentNode.parentNode.querySelectorAll('label')[0].textContent;
  e.target.parentNode.parentNode.appendChild(editFiled);

  editFiled.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      if (!editFiled.value) {
        return
      }
      const item = document.getElementsByClassName('edit')[0];
      const editingList = document.getElementsByClassName('editing')[0];
      console.log(editingList);
      console.dir(editingList.querySelector('label'));
      editingList.querySelector('label').innerHTML = item.value;
      editingList.classList.remove('editing');
      editingList.removeChild(item);
    }
  });
};

const deleteCompleteTodo = (e) => {
  console.log(list.querySelectorAll('li').classList.contains('completed'));
  list.removeChild(list.querySelectorAll('li').className('completed'));
};

writeField.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    if (!writeField.value) {
      return
    }
    const item = writeField.value;
    todoAdd(item);
  }
});

