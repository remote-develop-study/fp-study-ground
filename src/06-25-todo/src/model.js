export default class Model {
	getTodoList() {
		return this.todoList;
	}

	setTodoList(todoList) {
		this.todoList = todoList;
	}

	setTodo(newTodo) {
		this.todoList.push(newTodo);
		console.log(this.todoList);
	}
}
