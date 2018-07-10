export default class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  create() {
    this.model.save();
    this.view.render(todoComponent);
  }

  remove() {
    this.model.destroy();
    this.view.remove();
  }

  change() {
    this.model.update();
    this.view.refresh();
  }

}
