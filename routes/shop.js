import express from 'express';
import { products } from './admin.js';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('shop.ejs', {
		title: 'Shop',
		products,
		path: '/',
		productCSS: true,
		activeShop: true
	});
});

export default router;
