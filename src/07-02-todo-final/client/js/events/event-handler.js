import { ELEMENT, ELEMENTS } from '../elements';
import $ from '../dom-handler';
import HttpClient from '../http-client';

// Wrapping Primitive value as a variable
const ENTER = 'Enter';

const toggleAllBtnEventHandler = evt => {
  const { target } = evt;
  const todoItems = Array.from(ELEMENTS.$todoItems());

  target.classList.toggle('active');

  if (target.classList.contains('active')) {
    todoItems
      .filter($item => !$item.classList.contains('completed'))
      .map($item => {
        $item.firstElementChild.checked = true;
        $item.classList.add('completed')
      });
    if (ELEMENT.$activeBtn.classList.contains('active')) {
      $.display(ELEMENTS.$todoItems(), false);
    }
  } else {
    todoItems.map($item => {
      $item.firstElementChild.checked = false;
      $item.classList.remove('completed');
    });
    if (ELEMENT.$completedBtn.classList.contains('active')) {
      $.display(ELEMENTS.$todoItems(), false);
    }
  }
};

const filterBtnEventHandler = evt => {
  const { target } = evt;
  // Check target is a member of filter button elements
  const [ $selected ] = Array.from(ELEMENTS.$filterButtons).filter(btn => btn === target);
  if ($selected) {
    $.activateButtonSolitude($selected, ELEMENTS.$filterButtons);
    switch ($selected.innerText) {
      // All items could be displayed
      case 'All':
        $.display(ELEMENTS.$todoItems());
        return;
      // Displayed except for completed items
      case 'Active':
        $.display(ELEMENTS.$completedTodoItems(), false);
        $.display(ELEMENTS.$activatedTodoItems());
        return;
      // Displayed except for activated items
      case 'Completed':
        $.display(ELEMENTS.$activatedTodoItems(), false);
        $.display(ELEMENTS.$completedTodoItems());
        return;
      default:
        return;
    }
  }
};

const checkBoxEventHandler = evt => {
  const { parentElement } = evt.target;
  if (evt.target.nodeName === 'INPUT') {
    parentElement.classList.toggle('completed');
    const isCompleted = parentElement.classList.contains('completed');

    // Hide completed item when 'Active' filter button has been activated
    if (isCompleted && ELEMENT.$activeBtn.classList.contains('active')) {
      parentElement.style.display = 'none'
    }

    // Hide active item when 'Completed' filter button has been activated
    if (!isCompleted && ELEMENT.$completedBtn.classList.contains('active')) {
      parentElement.style.display = 'none'
    }
  }
};

const inputTextEventHandler = evt => {
  const httpClient = new HttpClient();
  return evt.key === ENTER
    ? httpClient.message('post', evt.target.value).then(res => console.log(res))
    : false;
};


export {
  toggleAllBtnEventHandler,
  filterBtnEventHandler,
  checkBoxEventHandler,
  inputTextEventHandler
}