var $input_value = document.querySelector('.new-todo').value;
var $input_todo = document.querySelector('.new-todo');
var $value = [];
var array = [];
// 엔터 눌렀을시 저장되게
function list_add() {
  $input_todo.addEventListener('keypress', function (e) {
    let x = e.which || e.keyCode;
    if (x == 13) {
      if($input_value === null){
        console.log('입력되지 않음');
      }
      else{
        var $value = e.target.value.trim()
        $input_todo.innteText = '';
        console.log($value);
        setItem($value);
      }
    }
  })
};
list_add();

//저장
function setItem($value) {
  array.push($value) ;
  for(var i=0;i<array.length;i++)
  {
    console.log(array[i]);
  }
  console.log('리스트' + $value);
  localStorage.setItem('리스트', $value);
  getItem($value);
};

//보여주기
function getItem($value) {
  let a = localStorage.getItem('리스트');
  console.log('getItem ' + a)
  let li = document.createElement('li');
  li.className = "false";
  li.innerHTML = [
    '<input type="checkbox" class="toggle">',
    '<label>' + $value + '</label>',
    '<button class="delete"></button>'
  ].join('');
  document.querySelector(".todo-list").appendChild(li);
};


// console.log($value[0])