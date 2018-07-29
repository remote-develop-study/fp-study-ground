// var $wired = document.getElementsByTagName('wired-item');
var $combo_item = document.querySelector('wired-combo');
// var _each = _curryr(_each);
var start_dan;
var end_dan = 9;

$combo_item.addEventListener('click',function(e){
  start_dan = e.target.value;
  console.log('선택한 숫자 : '+start_dan);
  //each
  // _each(start_dan);
  each(start_dan);
  //filter

  //map
})

// function _curryr(fn) {
//   return function(a, b) {
//     return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
//   }
// }

// function _is_object(obj){
//   return typeof obj == 'object' && !!obj;
// }

// function _keys(obj){
//   //obj라 객체 또는 배열인지
//   return _is_object(obj) ? Object.keys(obj) : [];
// }
function each(a){
  console.log(a * end_dan);
}
function _each(list){
  // var keys = _keys(list);
  var keys = list;
  // for ( var i =0; i< keys.length; i++){
  // }
    // console.log(iter(list[keys[i]], keys[i]));
  // return keys * end_dan;
  console.log(keys * end_dan)
  return keys * end_dan;
}

