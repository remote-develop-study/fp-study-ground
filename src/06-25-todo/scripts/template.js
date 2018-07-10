class Todo {

  static ID = 0;

  constructor(whatTodo, id = Todo.ID) {
    this.id = id;
    this.whatTodo = whatTodo;
    Todo.ID++;
  }

  get component() {
    return `
      <li class="todo" data-id="${this.id}">
        <input type="checkbox" name="todo" value="${this.whatTodo}" id="todo-${this.id}" />
        <label for="todo-${this.id}">${this.whatTodo}</label>
        <button class="remove"></button>
      </li>
    `
  }
}

export {
  Todo
}