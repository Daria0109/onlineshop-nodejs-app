import ProductsModel from '../models/products.js';

export default class ProductsController {
	getAddProduct(req, res) {
		res.render('add-product.ejs', {
			title: 'Add product',
			path: '/admin/add-product'
		})
	}

	postAddProduct(req, res) {
		const products = new ProductsModel(req.body);
		products.save();
		res.redirect('/');
	}

	getProducts(req, res) {
		ProductsModel.fetchAll((products) => {
			res.render('shop.ejs', {
				products,
				title: 'Shop',
				path: '/'
			});
		});
	}
}
