import fetchData from './api.js';

export default class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	// TODO: 내림차순으로 보여주기
	// TODO: default All
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

	addTodo(target) {
		const _ = this;
		const todoList = _.model.getTodoList();
		const [lastTodo] = todoList.slice(-1);
		const id = todoList.length > 0 ? lastTodo.id + 1 : 0;
		const newTodo = { id, content: target.value, completed: false };

		_.model.addTodo(newTodo);
		_.view.addTodo(newTodo);
		_.toggleFooter();

		const activeCount = _.model.getTodoLength(false);
		_.view.updateTodoCount(activeCount);

		target.value = '';
	}

	removeTodo(target) {
		const _ = this;
		const id = Number(target.id);
		const todoList = _.model.getTodoList();
		const targetIndex = todoList.findIndex(todo => todo.id === id);

		_.model.removeTodo(targetIndex);
		_.view.removeTodo(target);
		_.toggleFooter();

		const activeCount = _.model.getTodoLength(false);
		_.view.updateTodoCount(activeCount);
		_.toggleClsCompleted();
	}

	showEditMode(e) {
		this.view.showEditMode(e);
	}

	updateTodo({ target, keyCode }) {
		if (keyCode !== 13 || !target.value) return;
		const _ = this;
		const $parentNode = target.parentNode;
		const id = Number($parentNode.id);
		const todoList = _.model.getTodoList();
		const targetIndex = todoList.findIndex(todo => todo.id === id);
		const $label = $parentNode.querySelector('label');

		_.model.updateTodo(targetIndex, target.value);
		$label.textContent = target.value;
		_.view.hideEditMode(target, $label);
	}

	toggleState({ parentNode }) {
		const _ = this;
		const id = Number(parentNode.id);
		const todoList = _.model.getTodoList();
		const targetIndex = todoList.findIndex(todo => todo.id === id);

		_.model.toggleState(targetIndex);
		_.view.toggleState(parentNode, id);
		const activeCount = _.model.getTodoLength(false);
		_.view.updateTodoCount(activeCount);
		_.toggleClsCompleted();
	}

	clearCompleted(completedTodo) {
		[...completedTodo].map(ele => this.removeTodo(ele));
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

	// TODO: 리팩토링 & Active일때 Completed일때 전체체크박스 디스플레이 토글
	changeFilter($FILTERS, $TODO_LIST, target) {
		const [selectedState] = target.href.split('/').slice(-1);
		const toogleDisplay = this.view.toogleDisplay;

		[...$FILTERS].map(ele => {
			ele.classList.value === 'selected' && this.view.removeSelectedFilter(ele);
		});

		[...$TODO_LIST].map(ele => {
			let result = 'list-item';
			if (selectedState === 'active') {
				result = ele.classList.value === 'completed' ? 'none' : 'list-item';
			}
			if (selectedState === 'completed') {
				result = ele.classList.value === 'completed' ? 'list-item' : 'none';
			}
			toogleDisplay(ele, result);
		});
		this.view.addSelectedFilter(target);
	}

	// TODO: 전체 투두 토글
	toggleAll() {}
}
