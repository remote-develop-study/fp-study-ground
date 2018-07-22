const _each = require('./_each.js');

const _map = (list, mapper) => {
	let new_list = [];

	_each(list, (val) => new_list.push(mapper(val)));

	return new_list;
};
