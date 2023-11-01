import express from 'express';
import controllers from '../controllers/index.js';

const router = express.Router();

router.get('/', controllers.products.getProducts);

export default router;
