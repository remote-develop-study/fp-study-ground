import fetchData from './api.js';

export default class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	async init() {
		const _ = this;
		await _.loadTodoData();
		await _.view.init(_.model.getTodoList());
	}

	async loadTodoData() {
		const URL = './db/data.json';

		const result = await fetchData(URL);
		this.mappingTodoData(result.todo);
	}

	mappingTodoData(todo) {
		this.model.setTodoList(todo);
	}

	addTodo({ target, keyCode }) {
		if (keyCode !== 13 || !target.value) return;

		const _ = this;
		const id = _.model.getTodoList().length;
		const newTodo = { id, content: target.value, complete: false };

		_.model.addTodo(newTodo);
		_.view.addTodo(newTodo);

		// TODO: 재사용
		target.value = '';
	}

	removeTodo({ classList, parentNode }) {
		if (classList.value !== 'destroy') return;
		const _ = this;
		const id = parentNode.id;

		_.model.removeTodo(id);
		_.view.removeTodo(parentNode);
	}

	showEditMode(e) {
		this.view.showEditMode(e);
	}

	updateTodo({ target, keyCode }) {
		if (keyCode !== 13 || !target.value) return;
		const _ = this;
		const $parentNode = target.parentNode;
		const id = $parentNode.id;
		const $label = $parentNode.querySelector('label');

		_.model.updateTodo(id, target.value);
		$label.textContent = target.value;
		_.view.hideEditMode(target, $label);
	}

	// TODO: 필터링 렌더링
	toggleTodoState(id) {
		_.model.toggleTodoState(id);
		_.view.toggleTodoState(id);
	}

	// TODO: 필터링
	// Completed & Active & All
}
