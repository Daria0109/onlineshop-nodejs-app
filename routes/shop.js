import express from 'express';
import { products } from './admin.js';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('shop.pug', {title: 'Shop', products, path: '/'});
});

export default router;
