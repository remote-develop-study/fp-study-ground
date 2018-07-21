module.exports = function(list, iter) {
	for (var i = 0; i < list.length; i++) {
		iter(list[i]);
	}
};
