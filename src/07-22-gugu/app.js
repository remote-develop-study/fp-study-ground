import toNumArray from './toNumArray.js';
import toDivArray from './toDivArray.js';
import render from './render.js';

// DOM binding
(() => {
  const selectBtn = document.querySelector('select.choose-btn');
  selectBtn.addEventListener('change', (e) => {
    const dan = e.target.value;
    if(!dan) return;

    const numArray = toNumArray(dan);
    const divArray = toDivArray(dan, numArray);
    render(divArray);
  });
})()
