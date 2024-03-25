import ProductModel from '../models/products.js';
import OrderModel from '../models/order.js';

export default class ShopController {
	getIndex(req, res) {
		ProductModel.find()
			.then((products) => res.render('shop/index', {
				products,
				title: 'Shop',
				path: '/'
			}))
			.catch((err) => console.log(err));
	}

	getProducts(req, res) {
		ProductModel.find()
			// for info
			// .select('title imageUrl -_id')
			// .populate('userId')
			.then((products) => {
				console.log(products)
				res.render('shop/index', {
					products,
					title: 'Shop',
					path: '/'
				});
			})
			.catch((err) => console.log(err));
	}

	getProduct(req, res) {
		const productId = req.params.productId;

		ProductModel.findById(productId)
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
		req.user
			.populate('cart.items.productId')
			.then((data) => {
				return res.render('shop/cart', {
					path: '/cart',
					title: 'Your Cart',
					products: data.cart.items
				});
			})
			.catch((err) => console.log(err));
	}

	postCart(req, res) {
		const prodId = req.body.productId;

		ProductModel.findById(prodId)
			.then((data) => {
				return req.user.addToCart(data);
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
		req.user
			.populate('cart.items.productId')
			.then((data) => {
				const products = data.cart.items.map((item) => {
					return {
						product: { ...item.productId._doc },
						quantity: item.quantity
					}
				})

				const order = new OrderModel({
					products,
					user: {
						name: req.user.username,
						userId: req.user
					}
				});

				return order.save();
			})
			.then(() => req.user.clearCart())
			.then(() => res.redirect('/orders'))
			.catch((err) => console.log(err));
	}

	getOrders = (req, res, next) => {
		OrderModel.find({ 'user.userId': req.user._id })
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
