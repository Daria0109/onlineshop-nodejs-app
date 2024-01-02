import express from 'express';
import controllers from '../controllers/index.js';

const router = express.Router();

router.get('/', controllers.shop.getIndex);

router.get('/products', controllers.shop.getProducts)

router.get('/products/:productId', controllers.shop.getProduct);

router.get('/cart', controllers.shop.getCart);

router.post('/cart', controllers.shop.postCart);

router.get('/checkout', controllers.shop.getCheckout);

router.post('/cart-delete-item', controllers.shop.deleteCartItem);

export default router;
