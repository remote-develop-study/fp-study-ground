export default class Model {
	getTodoList(id) {
		return id ? this.todoList[id] : this.todoList;
	}

	getTodoLength(status = 'All') {
		const { todoList } = this;
		const isLength = todoList.filter(todo => todo.completed === status).length;

		return status === 'All' ? todoList.length : isLength;
	}

	setTodoList(todoList) {
		this.todoList = todoList;
	}

	addTodo(newTodo) {
		this.todoList.push(newTodo);
	}

	removeTodo(id) {
		if (this.todoList.length === 1) {
			this.todoList.length = 0;
		} else {
			this.todoList.splice(id, 1);
		}
	}

	updateTodo(id, newContent) {
		this.todoList[id].content = newContent;
	}

	toggleState(id, status = undefined) {
		this.todoList[id].completed =
			status === undefined ? !this.todoList[id].completed : status;
	}
}
