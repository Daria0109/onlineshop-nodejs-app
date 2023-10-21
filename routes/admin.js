import express from 'express';

const router = express.Router();

// /admin/add-product ---> GET
router.get('/add-product', (req, res, next) => {
	res.send('<form action="/admin/add-product" method="post"><input' +
		' type="text" name="product"' +
		' /><button type="submit">Add product</button></form>')
});

// /admin/add-product ---> POST
router.post('/add-product', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

export default router;
