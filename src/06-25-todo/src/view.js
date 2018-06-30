export default class View {
	constructor(element) {
		this.$ = element;
	}

	init(todo) {
		const $tmpl = todo.map(item => {
			return `<li id="${item.id}" class="${item.complete && 'completed'}">
	        <input class="toggle" type="checkbox">
	        <label>${item.content}</label>
	        <button class="destroy"></button>
        </li>`;
		});

		this.$.TODO_LIST.innerHTML = $tmpl.join('');
	}

	addTodo({ id, content }) {
		const $li = document.createElement('li');
		$li.setAttribute('id', id);

		$li.innerHTML = `<input class="toggle" type="checkbox">
		      <label>${content}</label>
		      <button class="destroy"></button>
        </li>`;

		this.$.TODO_LIST.appendChild($li);
	}

	removeTodo(node) {
		this.$.TODO_LIST.removeChild(node);
	}

	showEditMode({ target: $label }) {
		const { parentNode: $parentNode } = $label;
		const $newInput = document.createElement('input');

		$newInput.setAttribute('class', 'edit');
		$newInput.value = $label.textContent;

		$label.style.display = 'none';
		$parentNode.classList.value = 'editing';
		$parentNode.appendChild($newInput);
		$newInput.focus();
	}

	hideEditMode(target, $label) {
		const $newInput = target;
		const $parentNode = target.parentNode;

		$parentNode.removeAttribute('class');
		$parentNode.removeChild($newInput);
		$label.style.display = 'block';
	}

	toggleTodoState() {
		// TODO: 체크박스 & 취소선(클래스 토글)
		this.$.TODO_LIST.querySelector(`#${id}`).classList;
	}
}
