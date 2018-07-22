class View {

  static ENTER_KEY_CODE = 13;

  constructor() {
    this.$todoContainer = document.querySelector('.todo-list');
    this.$prompt = document.querySelector('.todo-prompt');
    this.$checkBox = document.querySelector('input[type=checkbox]');
    this.$label = document.querySelector('label');
    this.$removeBtn = document.querySelector('.remove');
  }


}


/**
 * 지우기
 * 추가
 * 상태값 처리
 *
 *
 **/