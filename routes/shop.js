import path from 'path';
import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.sendFile(path.join(process.cwd(), 'views', 'shop.html'));
});

export default router;
