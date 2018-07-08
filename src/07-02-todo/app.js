import { $ } from "./tool.js";

class Todo {
  constructor(content, id) {
    Object.assign(this, { content, id, active: true });
  }
}

const TodoApp = (() => {
  const Private = Symbol();
  let idx = -1;

  return class {
    constructor(parent) {
      if (typeof parent != "string" || !parent) throw "invalid param";
      this[Private] = { parent };
    }

    init(todos) {
      Object.assign(this[Private], { todos });
      if (todos.length) idx = todos[todos.length - 1].id;
      const app = $(this[Private].parent);
      if (!app) throw "invalid parent";
      this._newTodoListen();
      this._listListen();
      if (todos.length) this._render();
    }

    _save() {
      const { todos } = this[Private];
      localStorage.data = JSON.stringify({ todos });
      this._render();
    }

    _render() {
      $("#todo-count").innerHTML = this._todoCount();
      if (this._mainDisplay())
        $("#todo-list").innerHTML = this._create_todo_list();
    }

    _create_todo_list() {
      // TODO: 필터링을 쿼리스트링으로 구분하되, render시 filter를 통해 구현할 수 있도록 해야 할 것

      return this[Private].todos.map(v => this._templatify(v)).join("");
    }

    _newTodoListen() {
      const new_todo = $("#new-todo");
      new_todo.addEventListener("keypress", ({ key, target: { value } }) => {
        if (key != "Enter" || value == "") return;
        else {
          this[Private].todos.push(new Todo(value, ++idx));
          new_todo.value = "";
          this._save();
        }
      });
    }

    _toggleListen() {
      $("#todo-list").addEventListener("click", ({ target }) => {
        if (target.classList.value != "toggle") return;
        else {
          const {
            classList: parentClass,
            dataset: { id }
          } = target.parentElement;
          parentClass.toggle("completed");
          this._toggleActive(Number(id));
          this._save();
        }
      });
    }

    _deleteTodo() {
      $("#todo-list").addEventListener("click", ({ target }) => {
        if (target.classList.value != "destroy") return;
        else {
          const {
            dataset: { id }
          } = target.parentElement;
          const { todos } = this[Private];
          const targetId = Number(id);
          const idx = todos.findIndex(({ id }) => id == targetId);
          todos.splice(idx, 1);
          this._save();
        }
      });
    }

    _toggleActive(id) {
      const target = this[Private].todos.find(v => v.id == id);
      target.active = !target.active;
    }

    _listListen() {
      this._toggleListen();
      this._deleteTodo();
    }

    _templatify({ content, id, active }) {
      return `<li data-id="${id}" class="${active ? "" : "completed"}">
          <input class="toggle" type="checkbox" ${active ? "" : "checked"} />
          <label>${content}</label>
          <button class="destroy">
        </button></li>`;
    }

    _mainDisplay() {
      const main = $("#main");
      this[Private].todos.length
        ? (main.style.display = "block")
        : main.style.display == "none";
      return this[Private].todos.length;
    }

    _todoCount() {
      const count = this[Private].todos.filter(v => v.active).length;
      return count == 0 || count == 1
        ? `${count} item left`
        : `${count} items left`;
    }
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  const todoapp = new TodoApp("#app");
  const { data } = localStorage;
  const { todos } =
    typeof data == "string" && Array.isArray(JSON.parse(data).todos)
      ? JSON.parse(data)
      : { todos: [] };
  todoapp.init(todos);
});
