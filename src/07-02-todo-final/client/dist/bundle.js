/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/client.js":
/*!**********************!*\
  !*** ./js/client.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import attachEvents from './events/index';\n// import render from './render';\n// import HttpClient from './http-client'\n// import { Todo, TodoQueue } from './queue';\n//\n// const ready = () => {\n//   const httpClient = new HttpClient();\n//   Promise.resolve(httpClient.message('get'))\n//     .then(response => {\n//       const { data } = response;\n//       const todoData = Object.keys(data).map(key => new Todo(key, data[key]));\n//       const todoQueue = new TodoQueue(todoData);\n//       render(todoQueue);\n//     })\n//     .then(resolve => attachEvents());\n// };\n//\n// ready();\n//\n// /**\n//  * 안된거\n//  * 1. 최초 레디스에서 저장된 키밸류 받아서 뿌리기\n//  * 2. 브라우저 종료될 때 (또는 새로고침 할 때) 레디스에 데이터 저장하기\n//  * 3. 할 일 개수 연동\n//  * 4. 완료한 일 클릭시 삭제\n//  */\nvar getCookie = function getCookie() {\n  var regexp = /(user=)[A-Z]+/;\n  var userName = document.cookie.match(regexp);\n  console.log(userName);\n  return userName ? document.cookie : false;\n};\n\nvar CookieFactory =\n/*#__PURE__*/\nfunction () {\n  function CookieFactory() {\n    _classCallCheck(this, CookieFactory);\n\n    this.period = 7;\n    this.charLength = 15;\n  }\n\n  _createClass(CookieFactory, [{\n    key: \"cookieName\",\n    get: function get() {\n      var randIntString = Math.round(Math.random() * Math.pow(10, this.charLength));\n      var cookieName = '';\n\n      for (var i = 0; i < this.charLength; i++) {\n        var charCode = parseInt(randIntString.toString().charAt(i)) + 65;\n        cookieName += String.fromCharCode(charCode);\n      }\n\n      return \"user=\".concat(cookieName);\n    }\n  }, {\n    key: \"expireDate\",\n    get: function get() {\n      var today = new Date();\n      var expiresDate = new Date();\n      expiresDate.setDate(today.getDate() + this.period);\n      return \"expires=\".concat(new Date(expiresDate).toUTCString());\n    }\n  }, {\n    key: \"brandNewCookie\",\n    get: function get() {\n      return \"\".concat(this.cookieName, \"; \").concat(this.expireDate, \"; domain=.\").concat(window.location.hostname, \"; path=/;\");\n    }\n  }]);\n\n  return CookieFactory;\n}();\n\nif (!getCookie()) {\n  document.cookie = new CookieFactory().brandNewCookie;\n}\n\n;\n\n//# sourceURL=webpack:///./js/client.js?");

/***/ })

/******/ });