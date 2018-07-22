import { $SELECT_DAN, $GUGUDAN_LIST } from './element.js';

const _generateTmpl = ({ min, max }, tmpl) => {
	let result = '';

	for (let i = min; i <= max; i++) {
		result += tmpl(i);
	}

	return result;
};

const selectDanHandler = (selectedDan, max) => {
	const initOptions = {
		min: 1,
		max,
	};

	$GUGUDAN_LIST.innerHTML = _generateTmpl(
		initOptions,
		(i) => `<wired-item text="${selectedDan} x ${i} = ${selectedDan * i}"></wired-item>`,
	);
};

const init = (max = 9) => {
	const initOptions = {
		min: 2,
		max,
	};

	$SELECT_DAN.innerHTML = _generateTmpl(initOptions, (i) => `<wired-item value="${i}" text="${i}단"></wired-item>`);
};

window.onload = function() {
	const max = 9;

	init(max);

	$SELECT_DAN.addEventListener(
		'click',
		({ target }) => {
			if (target.classList.value !== 'selected-item') return;

			selectDanHandler(target.value, max);
		},
		false,
	);
};
