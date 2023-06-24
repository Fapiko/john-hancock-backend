import axios from 'axios';

function authenticatedDownload(url, sesisonId) {
	axios
		.get(url, {
			responseType: 'blob',
			headers: {
				Authorization: sesisonId,
			},
		})
		.then((response) => {
			const disposition = response.headers['content-disposition'];
			const filename = disposition.match(/filename=(.+)/)[1];

			const url = window.URL.createObjectURL(response.data);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			a.remove();
		});
}

export default authenticatedDownload;
