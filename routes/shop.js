import express from 'express';
import controllers from '../controllers/index.js';

const router = express.Router();

router.get('/', controllers.shop.getIndex);

router.get('/products', controllers.shop.getProducts)

router.get('/cart', controllers.shop.getCart)

router.get('/checkout', controllers.shop.getCheckout)

export default router;
