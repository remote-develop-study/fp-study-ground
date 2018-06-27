export default function fetchData(URL) {
	const request = new XMLHttpRequest();

	return new Promise((resolve, reject) => {
		request.open("GET", URL);
		request.onreadystatechange = function() {
			if (request.readyState === request.DONE && request.status === 200) {
				resolve(JSON.parse(request.response));
			}
		};
		request.send();
	});
}
