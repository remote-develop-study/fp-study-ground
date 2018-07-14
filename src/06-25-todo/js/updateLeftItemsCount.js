export default function() {
  const spanTag = document.querySelector('span.todo-count');
  const leftItemsCount = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos'))
      .filter((todo) => todo.status === '')
      .length
    :
    0;
  spanTag.innerHTML = `${leftItemsCount} ${leftItemsCount <= 1 ? 'item' : 'items'} left`;
}