export default class View {
	constructor(element) {
		this.$ = element;
	}

	init(todo) {
		const $tmpl = todo.map(item => {
			return `<li id="${item.id}" class="${item.complete && "completed"}">
	        <input class="toggle" type="checkbox">
	        <label>${item.content}</label>
	        <button class="destroy"></button>
        </li>`;
		});

		this.$.TODO_LIST.innerHTML = $tmpl.join("");
	}

  addTodo({ id, content }) {
		const $li = document.createElement("li");
		$li.setAttribute("id", id);

		$li.innerHTML = `<input class="toggle" type="checkbox">
		      <label>${content}</label>
		      <button class="destroy"></button>
        </li>`;

		this.$.TODO_LIST.appendChild($li);
  }
  
  removeTodo(node) {
    this.$.TODO_LIST.removeChild(node);
  }
}
