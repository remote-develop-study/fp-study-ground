import fetchData from "./api.js";

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
		const URL = "./db/data.json";

		const result = await fetchData(URL);
		this.mappingTodoData(result);
	}

	mappingTodoData(res) {
		this.model.setTodoList(res.todo);
	}

	addTodo({ target, keyCode }) {
		if (keyCode !== 13) return;
		const _ = this;

		const id = _.model.getTodoList().length;
		const newTodo = {
			id,
			content: target.value,
			complete: false
		};

		_.model.setTodo(newTodo);
		_.view.appendTodo(newTodo);
		target.value = "";
	}

	deleteTodo() {}
}
