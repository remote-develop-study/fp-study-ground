const _each = require('./_each.js');

const _filter = (list, condition) => {
	let newList = [];

	_each(list, val => condition(val) && newList.push(val));

	return newList;
};
