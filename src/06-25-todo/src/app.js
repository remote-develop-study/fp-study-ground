import Controller from './controller.js';
import Model from './model.js';
import View from './view.js';
import { element } from './element.js';

const model = new Model();
const view = new View(element);
const controller = new Controller(view, model);
const $ = element;

window.onload = function() {
	controller.init();
};

$.NEW_TEXT_INPUT.addEventListener('keyup', function(e) {
	controller.addTodo(e);
});

$.TODO_LIST.addEventListener('click', function({ target }) {
	controller.removeTodo(target);
});

$.TODO_LIST.addEventListener('dblclick', async function(e) {
	await controller.showEditMode(e);
	const $EDIT_TEXT_INPUT = $.TODO_LIST.querySelector('.edit');

	$EDIT_TEXT_INPUT.addEventListener('keyup', function(e) {
		controller.updateTodo(e);
	});
});

// TODO: 체크박스 - 상태변경
