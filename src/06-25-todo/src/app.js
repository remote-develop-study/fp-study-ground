import Controller from "./controller.js";
import Model from "./model.js";
import View from "./view.js";
import { element } from "./element.js";

const model = new Model();
const view = new View(element);
const controller = new Controller(view, model);
const $ = element;

window.onload = function() {
	controller.init();
};

$.TEXT_INPUT.addEventListener("keyup", function(e) {
  controller.addTodo(e);
});

$.TODO_LIST.addEventListener("click", function({ target }) {
  controller.removeTodo(target);
});
