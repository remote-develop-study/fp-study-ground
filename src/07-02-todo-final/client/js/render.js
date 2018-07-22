import * as template from './component';
import { ELEMENT } from './elements';

const render = (todoQueue) => {
  todoQueue.items.map(todo => {
    const range = document.createRange();
    range.selectNode(document.body);
    const listItem = range.createContextualFragment(template.todoItemComponent(todo));
    ELEMENT.$todoContainer.appendChild(listItem);
  });
};

export default render;