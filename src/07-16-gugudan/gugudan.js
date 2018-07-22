/*
  map, filter, forEach는 무의식적으로 만듬 이유는 모름
  구구단을 만들어야 하는데 고민하기도 전에 만듬...

  구구단 이랑 2 를 입력하면 2단
  3을 입력하면 3단
  4를 입력하면 4단
  ...
  n을 입력하면 n단

*/
import _map from './impl-func/map.js';

function maxError(cond, message) {
  if (cond > 9) {
    throw new Error(`${message}`);
  }
}

function minError(cond, message) {
  if(cond < 2) {
    throw new Error(`${message}`);
  }
}

function gugudanError(cond) {
  maxError(cond, `devJang... ...좌우지 장지지지... ...devJang`);
  minError(cond, `생각하세요 당신의 사용하드 코드와 구구단의 의미를`);
}
// for문
export function ForGugudan (dan) {
  gugudanError(dan);
  for (let i = 1; i < 10; i++) {
    console.log(`${dan} * ${i} = `, dan * i);
  }
}

export function StartEndGugudan (start, end, dan) {
  gugudanError(dan);
  for (let i = start; i < end; i++) {
    console.log(`${dan} * ${i} = `, dan * i);
  }  
}

export function danBydan (startDan, endDan) {
  gugudanError(startDan);
  for (let i = 1; i < 10; i++) {
    console.log(`${startDan} * ${i} = `, startDan * i);
  }
  if(startDan < endDan) {
    danBydan(++startDan, endDan);
  }
  
}
