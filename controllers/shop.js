import ProductsModel from '../models/products.js';

export default class ShopController {
	getIndex(req, res) {
		ProductsModel.fetchAll((products) => {
			res.render('shop/index', {
				products,
				title: 'Shop',
				path: '/'
			});
		});
	}

	getProducts(req, res) {
		ProductsModel.fetchAll((products) => {
			res.render('shop/product-list', {
				products,
				title: 'All products',
				path: '/products'
			});
		});
	}

	getCart(req, res) {
		res.render('shop/cart', {
			title: 'You cart',
			path: '/cart'
		})
	}

	getCheckout(req, res) {
		res.render('shop/checkout', {
			title: 'Checkout',
			path: '/checkout'
		})
	}
}
