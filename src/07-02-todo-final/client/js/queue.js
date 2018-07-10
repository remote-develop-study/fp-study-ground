class Todo {
  constructor(whatTodo, completed=false) {
    this.whatTodo = whatTodo;
    this.completed = completed;
  }

  jobsDone() {
    this.completed = true
  }

  activate() {
    this.completed = false
  }
}

class TodoQueue {

  constructor(...items) {
    this.items = [].concat(...items);
    this.ordering = 'desc';
    this.sortBy();
  }

  append (...items) {
    items.map(item => {
      if (!this.items.find(q => q.whatTodo === item.whatTodo)) {
        item.id = this.id;
        this.items.push(item)
      }
    });
    this.sortBy();
  }

  takeAway (item) {
    this.items = this.items.filter(v => v.whatTodo !== item.whatTodo)
  }

  sortBy (key="id") {
    this.items.sort((a, b) => this.ordering === 'asc' ? a[key] > b[key] : a[key] < b[key]);
  }

  get id() {
    return this.items.length; // TODO: 삭제가 되면?
  }
}

export {
  Todo,
  TodoQueue
}