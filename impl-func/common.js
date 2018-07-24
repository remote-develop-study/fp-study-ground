// var $wired = document.getElementsByTagName('wired-item');
var $combo_item = document.querySelector('wired-combo');
var number1;
var arr = [2,3,4,5,6,7,8,9]

$combo_item.addEventListener('click',function(e){
  number1 = e.target.value;
  console.log('선택한 숫자 : '+number1);
  //each
  each(arr);
  //filter

  //map
})
