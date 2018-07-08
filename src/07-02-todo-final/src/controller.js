import fetchData from './api.js';

export default class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	async init() {
		const _ = this;

		await _.loadTodoData();
		const todo = await _.model.getTodoList();
		const getTodoLength = status => _.model.getTodoLength(status);
		const isActiveCount = getTodoLength(false);
		const isCompletedCount = getTodoLength(true);

		await _.view.init(todo);
		_.toggleFooter();
		_.view.updateTodoCount(isActiveCount);
		_.toggleClsCompleted();
	}

	async loadTodoData() {
		const URL = './db/data.json';
		const result = await fetchData(URL);

		this.mappingTodoData(result.todo);
	}

	mappingTodoData(todo) {
		this.model.setTodoList(todo);
	}

	addTodo({ target: $NEW_TEXT_INPUT, keyCode }) {
		if (keyCode !== 13 || !$NEW_TEXT_INPUT.value) return;

		const _ = this;
		const todoList = _.model.getTodoList();
		const [lastTodo] = todoList.slice(-1);
		const id = todoList.length > 0 ? lastTodo.id + 1 : 0;
		const newTodo = { id, content: $NEW_TEXT_INPUT.value, completed: false };

		_.model.addTodo(newTodo);
		_.view.addTodo(newTodo);
		_.toggleFooter();

		const activeCount = _.model.getTodoLength(false);
		_.view.updateTodoCount(activeCount);

		$NEW_TEXT_INPUT.value = '';
	}

	removeTodo($LI) {
		const _ = this;
		const selectedId = Number($LI.id);
		const todoList = _.model.getTodoList();
		const selectedIndex = todoList.findIndex(todo => todo.id === selectedId);

		_.model.removeTodo(selectedIndex);
		_.view.removeTodo($LI);
		_.toggleFooter();

		const activeCount = _.model.getTodoLength(false);
		_.view.updateTodoCount(activeCount);
		_.toggleClsCompleted();
	}

	showEditMode(e) {
		this.view.showEditMode(e);
	}

	updateTodo({ target: $EDIT_TEXT_INPUT, keyCode }) {
		if (keyCode !== 13 || !$EDIT_TEXT_INPUT.value) return;
		const _ = this;
		const $LI = $EDIT_TEXT_INPUT.parentNode;
		const id = Number($LI.id);
		const todoList = _.model.getTodoList();
		const targetIndex = todoList.findIndex(todo => todo.id === id);
		const $label = $LI.querySelector('label');

		_.model.updateTodo(targetIndex, $EDIT_TEXT_INPUT.value);
		$label.textContent = $EDIT_TEXT_INPUT.value;
		_.view.hideEditMode($EDIT_TEXT_INPUT, $label);
	}

	hideEditMode($EDIT_TEXT_INPUT) {
		this.view.hideEditMode(
			$EDIT_TEXT_INPUT,
			$EDIT_TEXT_INPUT.parentNode.querySelector('label'),
		);
	}

	toggleState(target, status = undefined) {
		const _ = this;
		const $LI = status === undefined ? target.parentNode : target;
		const id = Number($LI.id);
		const todoList = _.model.getTodoList();
		const targetIndex = todoList.findIndex(todo => todo.id === id);

		_.model.toggleState(targetIndex, status);
		_.toggleClsCompleted();

		const activeCount = _.model.getTodoLength(false);

		_.view.toggleState($LI, id);
		_.view.updateTodoCount(activeCount);
		status === undefined && _.view.toggleToggleAllBtn(false);
	}

	clearCompleted($COMPLETED_TODO) {
		[...$COMPLETED_TODO].map($TODO => this.removeTodo($TODO));
	}

	toggleFooter() {
		const _ = this;
		const isTodoList = !!_.model.getTodoLength() ? 'block' : 'none';

		_.view.toggleFooter(isTodoList);
	}

	toggleClsCompleted() {
		const _ = this;
		const getTodoLength = status => _.model.getTodoLength(status);
		const isCompletedCount = getTodoLength(true);

		_.view.toggleClsCompleted(isCompletedCount >= 1 ? 'block' : 'none');
	}

	changeFilter($FILTERS, $TODO_LIST, $SELECTED_BTN) {
		const [selectedState] = $SELECTED_BTN.href.split('/').slice(-1);

		[...$FILTERS].map($A => {
			$A.classList.value === 'selected' && this.view.removeSelectedFilter($A);
		});

		[...$TODO_LIST].map($LI => {
			let result = 'list-item';
			if (selectedState === 'active') {
				result = $LI.classList.value === 'completed' ? 'none' : 'list-item';
			}
			if (selectedState === 'completed') {
				result = $LI.classList.value === 'completed' ? 'list-item' : 'none';
			}
			this.view.toogleDisplay($LI, result);
		});
		this.view.addSelectedFilter($SELECTED_BTN);
	}

	toggleAll($TOGGLE_ALL, $TODO_LIST) {
		const isChecked = $TOGGLE_ALL.checked;
		const isCompletedList = $LI =>
			isChecked
				? $LI.classList.value !== 'completed'
				: $LI.classList.value === 'completed';

		[...$TODO_LIST].filter(isCompletedList).map($LI => {
			this.toggleState($LI, isChecked);
			this.view.toggleChecked($LI.querySelector('.toggle'), isChecked);
		});
	}
}
