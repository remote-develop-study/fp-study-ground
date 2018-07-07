export default class Todo {
  constructor(content) {
    this.content = content;
    this.active = true;
  }

  set setContent(content) {
    this.content = content;
  }

  toggleActive() {
    this.active = !this.active;
  }
}
