import Controller from './controller.js';
import Model from './model.js';
import View from './view.js';
import $ from './element.js';

const model = new Model();
const view = new View($);
const controller = new Controller(view, model);

window.onload = function() {
	controller.init();
};

// TODO: 이벤트 처리 공통화 또는 분리....
$.NEW_TEXT_INPUT.addEventListener('keyup', function({ target, keyCode }) {
	if (keyCode !== 13 || !target.value) return;
	controller.addTodo(target);
});

// TODO: 편집모드 해제 이벤트 필요
$.TODO_LIST.addEventListener('click', function({ target }) {
	if (target.classList.value === 'destroy') {
		controller.removeTodo(target.parentNode);
	}

	if (target.classList.value === 'toggle') {
		controller.toggleState(target);
	}
});

$.TODO_LIST.addEventListener('dblclick', async function(e) {
	if (e.target.tagName !== 'LABEL') return;
	await controller.showEditMode(e);
	const $EDIT_TEXT_INPUT = $.TODO_LIST.querySelector('.edit');

	$EDIT_TEXT_INPUT.addEventListener('keyup', function(e) {
		controller.updateTodo(e);
	});
});

$.CLS_COMPLETED.addEventListener('click', function() {
	const $completedTodoItem = $.TODO_LIST.querySelectorAll('.completed');

	controller.clearCompleted($completedTodoItem);
});

$.FILTERS.addEventListener('click', function({ target }) {
	if (target.tagName !== 'A') return;
	const $FILTERS = $.FILTERS.querySelectorAll('li a');
	const $TODO_LIST = $.TODO_LIST.querySelectorAll('li');

	controller.changeFilter($FILTERS, $TODO_LIST, target);
});
