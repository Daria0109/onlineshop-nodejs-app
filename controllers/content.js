export default class ContentController {
	getNotFoundPage(req, res) {
		const {url} = req;

		res
			.status(404)
			.render('404.ejs', {title: 'Not found', path: url});
	}
}
