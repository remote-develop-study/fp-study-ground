import { ELEMENT } from '../elements';
import {
  checkBoxEventHandler,
  filterBtnEventHandler,
  inputTextEventHandler,
  toggleAllBtnEventHandler
} from './event-handler';



const setToggleAllBtnEvent = () => ELEMENT.$toggleAllBtn.addEventListener('click', toggleAllBtnEventHandler);
const setFilterBtnEvent = () => ELEMENT.$filterButtonContainer.addEventListener('click', filterBtnEventHandler);
const setCheckboxEvent = () => ELEMENT.$todoContainer.addEventListener('change', checkBoxEventHandler);
const setInputTextEvent = () => ELEMENT.$todoInput.addEventListener('keyup', inputTextEventHandler);

const attachEvents = () => {
  setToggleAllBtnEvent();
  setCheckboxEvent();
  setFilterBtnEvent();
  setInputTextEvent();
};

export default attachEvents;

