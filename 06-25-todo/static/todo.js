var $input_value = document.querySelector(".new-todo").value;
var $input_todo = document.querySelector(".new-todo");
var $todo_list = document.querySelector('.todo-list');
// 로컬스토리지 저장소
var data = localStorage.data ? JSON.parse(localStorage.data) : [];
var data_local = JSON.parse(window.localStorage.getItem("data")) ? null : [];
// 머지 리퀘 테스트1
getItem(data);
//갯수 보기
setInterval(count, 500);
function count() {
  document.querySelector(".todo-count").innerHTML = data.length + " items left";
  // console.log('aa');
}

// 엔터 눌렀을시 저장되게
function list_add() {
  $input_todo.addEventListener("keyup", function (e) {
    let x = e.which || e.keyCode;
    if (x == 13) {
      //공백일때
      if (e.target.value === "") {
        console.log("입력되지 않음");
      }
      //공백이 아닐때
      else {
        let v = e.target.value.trim();
        data.push(v);
        // 저장하기
        setItem(data);
        // 공백으로 만듬
        document.querySelector(".new-todo").value = "";
        $input_todo.value = "";
      }
    }
  });
}
list_add();

//저장
function setItem(data) {
  window.localStorage.setItem("data", JSON.stringify(data));
  for (var i = 0; i < data.length; i++) {
    var li = document.createElement("li");
    var text = document.createTextNode(data[i]);
    li.appendChild(text);
    li.className = "false";
    li.innerHTML = [
      '<input type="checkbox" class="toggle">',
      "<label>" + data[i] + "</label>",
      '<button class="delete"></button>'
    ].join("");
  }
  document.querySelector(".todo-list").appendChild(li);
}

//보여주기
function getItem(data) {
  var $ul = document.querySelector(".todo-list");
  var $li = document.createElement("li");

  // 바닐라js 뿌리기
  var reverse_data = data.reverse();
  for (var i = 0; i < reverse_data.length; i++) {
    var htm = "";
    htm =
      '<li class="false">' +
      '<input type="checkbox" class="toggle">' +
      "<label>" +
      reverse_data[i] +
      "</label>" +
      '<button class="delete"></button>' +
      "</li>";
    $li.innerHTML = htm;
    $ul.appendChild($li.firstChild);
  }
  // console.log(data_local);
  document.querySelector(".todo-count").innerHTML =
    reverse_data.length + " items left";
}


//완료. 삭제
$todo_list.addEventListener('click', function(e){
  let el = e.target;
  console.log(el);
  // console.log(el.innerHTML);
  // 삭제
  if (el.classList.contains('delete')) {
    console.log('버튼');
  }
  // 완료
  if (el.classList.contains('toggle')) {
    el.parentNode.classList.toggle('completed');
    // console.log('토글');
  }
});

// 필터링 탭
document.addEventListener('click', function (e) {
  let el = e.target.innerHTML;
  if(el=="Completed"){
    console.log('완료');
  }
  if(el=="Active"){
    console.log('액티브');
  }
  if(el=="All"){
    console.log('모두')
  }
});

function filter_view(){
  
}

//전체 완료
// $mother_chckbox.addEventListener("click", function () { });
