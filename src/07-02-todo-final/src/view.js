export default class View {
	constructor(element) {
		this.$ = element;
	}

	init(todo) {
		// TODO: 템플릿 리터럴로 교체
		todo.map(item => {
			const $li = document.createElement('li');
			const $checkBox = document.createElement('input');
			const $label = document.createElement('label');
			const $closeBtn = document.createElement('button');

			// TODO: data-id로 바꾸기
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

		this.toogleDisplay($label, 'none');
		$parentNode.classList.value = 'editing';
		$parentNode.appendChild($newInput);
		$newInput.focus();
	}

	hideEditMode(target, $label) {
		const $newInput = target;
		const $parentNode = target.parentNode;

		$parentNode.removeAttribute('class');
		$parentNode.removeChild($newInput);
		this.toogleDisplay($label, 'block');
	}

	toogleDisplay($target, condition) {
		$target.style.display = condition;
	}

	updateTodoCount(count) {
		// TODO: item & items 처리
		this.$.TODO_COUNT.textContent = `${count} item left`;
	}

	toggleState($parentNode) {
		$parentNode.classList.toggle('completed');
	}

	toggleClsCompleted(status) {
		this.toogleDisplay(this.$.CLS_COMPLETED, status);
	}

	addSelectedFilter($target) {
		$target.classList.add('selected');
	}

	removeSelectedFilter($target) {
		$target.removeAttribute('class');
	}
}
