import ProductsModel from '../models/products.js';

export default class AdminController {
	getAddProduct(req, res) {
		res.render('admin/add-product', {
			title: 'Add product',
			path: '/admin/add-product'
		})
	}

	postAddProduct(req, res) {
		const {title, imageUrl, price, description} = req.body;
		const products = new ProductsModel(title, imageUrl, price, description);
		products.save();
		res.redirect('/');
	}

	getProducts(req, res) {
		res.render('admin/products', {
			title: 'Admin product',
			path: '/admin/products'
		})
	}
}
