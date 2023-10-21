import express from 'express';

const router = express.Router();

router.get('/add-product', (req, res, next) => {
	res.send('<form action="/product" method="post"><input' +
		' type="text" name="product"' +
		' /><button type="submit">Add product</button></form>')
});

router.post('/product', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

export default router;
