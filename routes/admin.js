import path from 'path';
import express from 'express';
import { _dirname } from '../helpers/utils.js';

const router = express.Router();

// /admin/add-product ---> GET
router.get('/add-product', (req, res, next) => {
	res.sendFile(path.join(_dirname, '../', 'views', 'add-product.html'))
});

// /admin/add-product ---> POST
router.post('/add-product', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

export default router;
