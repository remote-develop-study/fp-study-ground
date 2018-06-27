import Controller from "./controller.js";
import Model from "./model.js";
import View from "./view.js";
import { element } from "./element.js";

window.onload = function() {
	const model = new Model();
	const view = new View(element);
	const controller = new Controller(view, model);
	const $ = element;

	controller.init();

	$.TEXT_INPUT.addEventListener("keyup", function(e) {
		controller.addTodo(e);
	});

	console.log($);
	$.CLOSE_BTN.addEventListener("mouseover", function(e) {
		console.log(e);
	});
};
