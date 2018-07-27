<<<<<<< Updated upstream
// each기능을 구현

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
=======

// each기능을 구현
function _each(){
  
}
>>>>>>> Stashed changes
