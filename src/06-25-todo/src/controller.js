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
    if (keyCode !== 13 || !target.value) return;
    
		const _ = this;
		const id = _.model.getTodoList().length;
		const newTodo = {
			id,
			content: target.value,
			complete: false
		};

		_.model.addTodo(newTodo);
    _.view.addTodo(newTodo);
		target.value = "";
	}

  removeTodo(target) {
    const { classList, parentNode } = target;
    if (classList.value !== 'destroy') return;
    const _ = this;
    const id = parentNode.id;

    _.model.removeTodo(id);
    _.view.removeTodo(parentNode);
  }
}
