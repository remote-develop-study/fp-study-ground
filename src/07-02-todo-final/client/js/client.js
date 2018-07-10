// import attachEvents from './events/index';
// import render from './render';
// import HttpClient from './http-client'
// import { Todo, TodoQueue } from './queue';
//
// const ready = () => {
//   const httpClient = new HttpClient();
//   Promise.resolve(httpClient.message('get'))
//     .then(response => {
//       const { data } = response;
//       const todoData = Object.keys(data).map(key => new Todo(key, data[key]));
//       const todoQueue = new TodoQueue(todoData);
//       render(todoQueue);
//     })
//     .then(resolve => attachEvents());
// };
//
// ready();
//
// /**
//  * 안된거
//  * 1. 최초 레디스에서 저장된 키밸류 받아서 뿌리기
//  * 2. 브라우저 종료될 때 (또는 새로고침 할 때) 레디스에 데이터 저장하기
//  * 3. 할 일 개수 연동
//  * 4. 완료한 일 클릭시 삭제
//  */

const getCookie = () => {
  const regexp = /(user=)[A-Z]+/;
  const userName = document.cookie.match(regexp);
  console.log(userName);
  return userName ? document.cookie : false;
};


class CookieFactory {

  period = 7;
  charLength = 15;

  get cookieName () {
    const randIntString = Math.round(Math.random() * Math.pow(10, this.charLength));
    let cookieName = '';

    for (let i = 0; i < this.charLength; i++) {
      const charCode = parseInt(randIntString.toString().charAt(i)) + 65;
      cookieName += String.fromCharCode(charCode);
    }

    return `user=${cookieName}`;
  }

  get expireDate () {
    const today = new Date();
    const expiresDate = new Date();
    expiresDate.setDate(today.getDate() + this.period);

    return `expires=${new Date(expiresDate).toUTCString()}`;
  }

  get brandNewCookie () {
    return `${this.cookieName}; ${this.expireDate}; domain=.${window.location.hostname}; path=/;`
  }
}

if (!getCookie()) {
  document.cookie = new CookieFactory().brandNewCookie;
};

