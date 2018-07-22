const $ = (query, target = document) => {
	return target.querySelectorAll(query).length > 1 ? [...target.querySelectorAll(query)] : target.querySelector(query);
};

export { $ };
