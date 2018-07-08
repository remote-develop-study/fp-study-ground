var $input_value = document.querySelector('.new-todo').value;
var $input_todo = document.querySelector('.new-todo');
// 로컬스토리지 저장소
// 저장되는 값
// var $value = [];
var data = [];

getItem(data);
// 엔터 눌렀을시 저장되게
function list_add() {
  $input_todo.addEventListener('keypress', function (e) {
    let x = e.which || e.keyCode;
    if (x == 13) {
      //공백일때
      if (e.target.value === '') {
        console.log('입력되지 않음');
      }
      //공백이 아닐때
      else {
        let v = e.target.value.trim()
        data.push(v);
        // 저장하기
        setItem(data);

        //보여주기
        // getItem(data);

        // 공백으로 만듬
        document.querySelector('.new-todo').value = "";
        $input_todo.value = "";
      }
    }
  })
};
list_add();

//저장
function setItem(data) {
  window.localStorage.setItem('data', JSON.stringify(data));

  for (var i = 0; i < data.length; i++) {
    console.log('setItem 함수 내부 ' + data);
    var li = document.createElement('li');
    var text = document.createTextNode(data[i]);
    li.appendChild(text);
    li.className = "false";
    li.innerHTML = [
      '<input type="checkbox" class="toggle">',
      '<label>' + data[i] + '</label>',
      '<button class="delete"></button>'
    ].join('');
  }
  document.querySelector(".todo-list").appendChild(li);
};

//보여주기
function getItem(data) {
  var $ul = document.querySelector('.todo-list');
  var $li = document.createElement('li');
  var data = JSON.parse(window.localStorage.getItem("data"));

  // jquery 뿌리기
  // for (var i = 0; i < data.length; i++) {
  //   var htm = '';
  //   htm = '<li class="false">' +
  //     '<input type="checkbox" class="toggle">' +
  //     '<label>' + data[i] + '</label>' +
  //     '<button class="delete"></button>' +
  //     '</li>'
  //   $('.todo-list').append(htm);
  // }

  // 바닐라js 뿌리기
  for (var i = 0; i < data.length; i++) {
    var htm = '';
    htm = '<li class="false">' +
      '<input type="checkbox" class="toggle">' +
      '<label>' + data[i] + '</label>' +
      '<button class="delete"></button>' +
      '</li>'
    $li.innerHTML = htm;
    $ul.appendChild($li.firstChild);
  }
  console.log(data);
};

//data delete
function a() {

}

//완료 토글
var $checkbox = document.querySelector('.toggle');
var $mother_chckbox = document.querySelector('.toggle-all');

$checkbox.addEventListener('click',finish)
$mother_chckbox.addEventListener('click',all_finish)

function finish() {
  
  this.parentNode.classList.toggle('finished');
}
function all_finish(){

};