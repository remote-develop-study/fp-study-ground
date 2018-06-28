export default class Model {
	getTodoList() {
		return this.todoList;
	}

	setTodoList(todoList) {
		this.todoList = todoList;
	}

  addTodo(newTodo) {
		this.todoList.push(newTodo);
  }
  
  removeTodo(id) {
    this.todoList.splice(id, 1);
  }
}
