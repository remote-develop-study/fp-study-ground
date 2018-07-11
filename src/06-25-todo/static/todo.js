var $input_value = document.querySelector(".new-todo").value;
var $input_todo = document.querySelector(".new-todo");
// 로컬스토리지 저장소
var data = localStorage.data ? JSON.parse(localStorage.data) : [];
var data_local = JSON.parse(window.localStorage.getItem("data"));
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
  $input_todo.addEventListener("keyup", function(e) {
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

        //보여주기
        // getItem(data);

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
  for (var i = 0; i < data_local.length; i++) {
    var htm = "";
    htm =
      '<li class="false">' +
      '<input type="checkbox" class="toggle">' +
      "<label>" +
      data_local[i] +
      "</label>" +
      '<button class="delete"></button>' +
      "</li>";
    $li.innerHTML = htm;
    $ul.appendChild($li.firstChild);
  }
  // console.log(data_local);
  document.querySelector(".todo-count").innerHTML =
    data_local.length + " items left";
}

//삭제
// var $delete_btn = document.querySelector('.delete');
// $delete_btn.addEventListener('click', delete_list)
// function delete_list() {
// }

var $mother_chckbox = document.querySelector(".toggle-all");
//완료
//.todo-list 에 걸어보기
document.querySelector(".toggle").addEventListener("click", function(e) {
  e.target.parentElement.classList.toggle("finished");
  // this.parentNode.classList.toggle('finished');
  // this.parentElement.style.display = 'none';
  // this.parentElement.style.background = 'black';
  // console.log(this);
});

//전체 완료
$mother_chckbox.addEventListener("click", function() {});
