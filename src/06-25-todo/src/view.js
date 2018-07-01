export default class View {
	constructor(element) {
		this.$ = element;
	}

	init(todo) {
		todo.map(item => {
			const $li = document.createElement('li');
			const $checkBox = document.createElement('input');
			const $label = document.createElement('label');
			const $closeBtn = document.createElement('button');

			$li.setAttribute('id', item.id);
			$checkBox.setAttribute('type', 'checkbox');

			$checkBox.classList.add('toggle');
			$closeBtn.classList.add('destroy');
			$label.textContent = item.content;

			if (item.completed) {
				$li.classList.add('completed');
				$checkBox.checked = true;
			}

			$li.appendChild($checkBox);
			$li.appendChild($label);
			$li.appendChild($closeBtn);

			this.$.TODO_LIST.appendChild($li);
		});
	}

	toggleFooter(status) {
		this.$.FOOTER.style.display = status;
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

	updateTodoCount(count) {
		this.$.TODO_COUNT.textContent = `${count} item left`;
	}

	toggleState($parentNode) {
		$parentNode.classList.toggle('completed');
	}

	toggleClsCompleted(status) {
		this.$.CLS_COMPLETED.style.display = status;
	}
}
