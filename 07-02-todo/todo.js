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

  templatify(idx) {
    return `<li data-key="${idx}"><input class="toggle" type="checkbox" /><label>${
      this.content
    }</label><button class="destroy"></button></li>`;
  }
}
