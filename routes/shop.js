import path from 'path';
import express from 'express';
import { _dirname } from '../helpers/utils.js';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.sendFile(path.join(_dirname, '../', 'views', 'shop.html'));
});

export default router;
