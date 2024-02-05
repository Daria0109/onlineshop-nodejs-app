import ProductModel from '../models/products.js';

export default class ShopController {
	getIndex(req, res) {
		ProductModel.fetchAll()
			.then((products) => res.render('shop/index', {
				products,
				title: 'Shop',
				path: '/'
			}))
			.catch((err) => console.log(err));
	}

	getProducts(req, res) {
		ProductModel.fetchAll()
			.then((products) => res.render('shop/index', {
				products,
				title: 'Shop',
				path: '/'
			}))
			.catch((err) => console.log(err));
	}

	getProduct(req, res) {
		const productId = req.params.productId;

		ProductModel.fetchOne(productId)
			.then((data) => {
				res.render('shop/product-detail', {
					product: data,
					title: data.title,
					path: '/products'
				});
			})
			.catch((err) => console.log(err));
	}

	getCart(req, res) {
		req.user.getCart()
			.then((data) => {
				return res.render('shop/cart', {
					path: '/cart',
					title: 'Your Cart',
					products: data
				});
			})
			.catch((err) => console.log(err));
	}

	postCart(req, res) {
		const prodId = req.body.productId;

		ProductModel.fetchById(prodId)
			.then((data) => {
				return req.user.addToCart(data._id);
			})
			.then(() => res.redirect('/cart'))
			.catch((err) => console.log(err));
	}

	deleteCartItem = (req, res, next) => {
		const productId = req.body.productId;

		req.user.deleteCartItem(productId)
			.then(() => res.redirect('/cart'))
			.catch((err) => console.log(err));
	};

	postOrder = (req, res, next) => {
		req.user.addOrder()
			.then(() => res.redirect('/orders'))
			.catch((err) => console.log(err));
	}

	getOrders = (req, res, next) => {
		return req.user.getOrders()
			.then((orders) => {
				res.render('shop/orders', {
					path: '/orders',
					title: 'Your Orders',
					orders
				});
			})
			.catch((err) => console.log(err));
	};
}
