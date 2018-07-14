//CRUD
const TODO = [];
let ID = 1;
const STATE_I = '진행';
const STATE_F = '완료';
// const data = localStorage;


const addTask = (task) => {
  const WORK = {ID: ID++, TASK:task, STATE:STATE_I};
  TODO.push(WORK);
  render()
};

const removeTask = (id) => {
  TODO.splice((id-1), 1);
  render();
};

const modifyTask = (id, task) => {
  TODO[(id-1)].TASK = task;
  render();
};

const changeStateTask = (id) => {
  if( TODO[(id-1)].STATE === STATE_I) {
    TODO[(id - 1)].STATE = STATE_F;
  } else {
    TODO[(id-1)].STATE = STATE_I;
  }
  render();
};

const render = () => {
  console.log(TODO);
}