export default class Todo {
  constructor(content, id) {
    Object.assign(this, { content, id, active: true });
  }

  set setContent(content) {
    this.content = content;
  }

  toggleActive() {
    this.active = !this.active;
  }
}
