// var $wired = document.getElementsByTagName('wired-item');
var $combo_item = document.querySelector('wired-combo');
var number1;
var arr = [2,3,4,5,6,7,8,9]

$combo_item.addEventListener('click',function(e){
  number1 = e.target.value;
  console.log('선택한 숫자 : '+number1);
  //each
  each(arr);
  iterator(arr);

  
  //filter

  //map
})


function iterator(arr){
  var nextIndex = 0;
  return {
     next: function(){
         return nextIndex < array.length ?
             {value: array[nextIndex++], done: false} :
             {done: true};
     }
  }
}




 function each (collection, iterator) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  }
};