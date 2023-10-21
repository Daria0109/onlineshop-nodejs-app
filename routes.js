import fs from 'fs';

export function routes(req, res) {
	const {url, method} = req;

	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Page from Node.js</title></head>');
		res.write('<body>' +
			'<form action="/message" method="POST"><input type="text" name="message"/>' +
			'<button type="submit">Send</button>' +
			'</form>' +
			'</body>');
		res.write('</html>');
		return res.end();
	}

	if (url === '/message' && method === 'POST') {
		const data = [];
		req.on('data', (chunk) => {
			data.push(chunk);
		});
		req.on('end', () => {
			const message = Buffer.concat(data).toString().split('=')[1];
			fs.writeFileSync('message.txt', message);
		})
		res.statusCode = 302;
		res.setHeader('Location', '/');
		return res.end();
	}
}
