import express from 'express';
import controllers from './../controllers/index.js';

const router = express.Router();

// /admin/add-product ---> GET
router.get('/add-product', controllers.admin.getAddProduct);

// /admin/add-product ---> POST
router.post('/add-product', controllers.admin.postAddProduct);

router.get('/products', controllers.admin.getProducts);

export default router;
