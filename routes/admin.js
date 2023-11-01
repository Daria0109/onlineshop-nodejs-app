import express from 'express';
import controllers from './../controllers/index.js';

const router = express.Router();

// /admin/add-product ---> GET
router.get('/add-product', controllers.products.getAddProduct);

// /admin/add-product ---> POST
router.post('/add-product', controllers.products.postAddProduct);

export default router;
