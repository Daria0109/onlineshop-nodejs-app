import express from 'express';

const router = express.Router();

export const products = [];

// /admin/add-product ---> GET
router.get('/add-product', (req, res, next) => {
	res.render('add-product.pug', {title: 'Add product', path: '/admin/add-product'})
});

// /admin/add-product ---> POST
router.post('/add-product', (req, res, next) => {
	products.push(req.body);
	res.redirect('/');
});

export default router;
