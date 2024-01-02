import express from 'express';
import controllers from '../controllers/index.js';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', controllers.admin.getAddProduct);

// /admin/products => GET
router.get('/products', controllers.admin.getProducts);

// /admin/add-product => POST
router.post('/add-product', controllers.admin.postAddProduct);

router.get('/edit-product/:productId', controllers.admin.getEditProducts);

router.post('/edit-product/:productId', controllers.admin.postEditProducts);

router.post('/delete-product', controllers.admin.deleteProduct);

export default router;
