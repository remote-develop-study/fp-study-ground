import { $, $$ } from "./tool.js";

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
      this._eventListen();
      this._render();
    }

    _save() {
      const { todos } = this[Private];
      localStorage.data = JSON.stringify({ todos });
      this._render();
    }

    _render() {
      $("#todo-count").innerHTML = this._todoCount();
      Array.from($$("#filters a")).forEach(v => v.classList.remove("selected"));
      this._check_filters();
      if (this._mainDisplay()) {
        $("#todo-list").innerHTML = this._generate_todo_list();
        this._clearCompletedDisplay();
      }
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

    _eventListen() {
      this._hashListen();
      this._toggleListen();
      this._deleteListen();
      this._toggleAllListen();
      this._clearCompletedListen();
    }

    _hashListen() {
      const _render = this._render.bind(this);
      window.addEventListener("hashchange", _render);
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

    _deleteListen() {
      $("#todo-list").addEventListener("click", ({ target }) => {
        if (target.classList.value != "destroy") return;
        else {
          const { id } = target.parentElement.dataset;
          const { todos } = this[Private];
          const targetId = Number(id);
          const idx = todos.findIndex(({ id }) => id == targetId);
          todos.splice(idx, 1);
          this._save();
        }
      });
    }

    _toggleAllListen() {
      $("#main > input").nextElementSibling.addEventListener(
        "click",
        ({ target: { htmlFor } }) => {
          if (htmlFor != "toggle-all") return;
          const { todos } = this[Private];
          if (todos.every(({ active }) => !active)) {
            todos.forEach(v => (v.active = true));
          } else todos.forEach(v => (v.active = false));
          this._save();
        }
      );
    }

    _clearCompletedListen() {
      $("#clear-completed").addEventListener("click", () => {
        let { todos } = this[Private];
        this[Private].todos = todos.filter(({ active }) => active);
        this._save();
      });
    }

    _check_filters() {
      const query = location.hash.slice(1) ? location.hash.slice(1) : "all";
      $(`#filter-${query}`).classList.add("selected");
    }

    _clearCompletedDisplay() {
      if (this[Private].todos.filter(({ active }) => !active).length) {
        $("#clear-completed").style.display = "block";
      } else $("#clear-completed").style.display = "none";
    }

    _generate_todo_list() {
      const { todos } = this[Private];
      const query = location.hash.slice(1) ? location.hash.slice(1) : "all";
      let result;
      if (query == "all") result = todos;
      else if (query == "active") result = todos.filter(({ active }) => active);
      else if (query == "completed")
        result = todos.filter(({ active }) => !active);
      return result.map(v => this._templatify(v)).join("");
    }

    _mainDisplay() {
      const main = $("#main");
      this[Private].todos.length
        ? (main.style.display = "block")
        : (main.style.display = "none");
      return this[Private].todos.length;
    }

    _templatify({ content, id, active }) {
      return `<li data-id="${id}" class="${active ? "" : "completed"}">
          <input class="toggle" type="checkbox" ${active ? "" : "checked"} />
          <label>${content}</label>
          <button class="destroy">
        </button></li>`;
    }

    _todoCount() {
      const count = this[Private].todos.filter(v => v.active).length;
      return `${count} item${count == 1 ? "s" : ""} left`;
    }

    _toggleActive(id) {
      const target = this[Private].todos.find(v => v.id == id);
      target.active = !target.active;
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
