import { $, $$ } from "./tool.js";
import Todo from "./todo.js";

const TodoApp = (() => {
  const Private = Symbol();

  return class {
    constructor(parent) {
      if (typeof parent != "string" || !parent) throw "invalid param";
      this[Private] = { parent };
    }

    init(todos) {
      Object.assign(this[Private], { todos });

      const app = $(this[Private].parent);
      if (!app) throw "invalid parent";

      this._newTodoListen();
      this._render();
    }

    _save() {
      localStorage.data = JSON.stringify({ todos: this[Private].todos });
      this._render();
    }

    _render() {
      const { todos } = this[Private];
      if (!todos.length) return;
      else {
        this._mainDisplay();
        const todo_list = this._create_todo_list();
        $("#todo-list").innerHTML = todo_list;
        $("#todo-count").innerHTML = this._todoCount();
      }
    }

    _create_todo_list() {
      return this[Private].todos
        .map(({ content }, i) => this._templatify(content, i))
        .join("");
    }

    _newTodoListen() {
      const new_todo = $("#new-todo");
      new_todo.addEventListener("keypress", ({ key, target: { value } }) => {
        if (key != "Enter") return;
        else {
          this[Private].todos.push(new Todo(value));
          this._save();
          new_todo.value = "";
          this._render();
        }
      });
    }

    _templatify(content, idx) {
      return `<li data-key="${idx}"><input class="toggle" type="checkbox" /><label>${content}</label><button class="destroy"></button></li>`;
    }

    _mainDisplay() {
      const main = $("#main");
      if (main.style.display == "none") main.style.display = "block";
    }

    _todoCount() {
      const count = this[Private].todos.filter(v => v.status).length;
      return count == 0 || count == 1
        ? `${count} item left`
        : `${count} items left`;
    }
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  const todoapp = new TodoApp("#app");
  const { todos } =
    typeof localStorage.data == "string" &&
    Array.isArray(JSON.parse(localStorage.data).todos)
      ? JSON.parse(localStorage.data)
      : { todos: [] };
  todoapp.init(todos);
});
