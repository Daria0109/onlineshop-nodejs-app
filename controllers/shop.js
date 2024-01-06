import ProductsModel from '../models/products.js';
import CartModel from '../models/cart.js';
import CartItemModel from '../models/cart-item.js';
import user from '../models/user.js';

export default class ShopController {
	getIndex(req, res) {
		req.user
			.getProducts()
			.then((data) => {
					res.render('shop/index', {
						products: data,
						title: 'Shop',
						path: '/'
					});
			})
			.catch((err) => console.log(err));
	}

	getProducts(req, res) {
		req.user
			.getProducts()
			.then((data) => {
				res.render('shop/index', {
					products: data,
					title: 'Shop',
					path: '/'
				});
			})
			.catch((err) => console.log(err));

	}

	getProduct(req, res) {
		const productId = req.params.productId;

		req.user
			.getProducts({where: {id: productId}})
			.then((data) => {
				res.render('shop/product-detail', {
					product: data[0],
					title: data[0].title,
					path: '/products'
				});
			})
			.catch((err) => console.log(err));
	}

	getCart(req, res) {
		req.user.getCart()
			.then((cart) => {
				return cart.getProducts();
			})
			.then((products) => {
				return res.render('shop/cart', {
					path: '/cart',
					title: 'Your Cart',
					products: products
				});
			})
			.catch((err) => console.log(err));
	}

	postCart(req, res) {
		const prodId = req.body.productId;
		let userCart;

		req.user.getCart()
			.then((cart) => {
				userCart = cart;
				return cart.getProducts({where: {id: prodId}})
			})
			.then((products) => {
				const searchedProduct = products[0];
				if (searchedProduct) {
					return searchedProduct;
				}
				return ProductsModel.findAll({where: {id: prodId}});
			})
			.then((product) => {
				const previousQuantity = product.CartItem;

				return userCart.addProduct(product, {
					through: {
						quantity: previousQuantity ? previousQuantity.quantity + 1 : 1
					}
				});
			})
			.then(() => res.redirect('/cart'))
			.catch((err) => console.log(err));
	}

	deleteCartItem = (req, res, next) => {
		const productId = req.body.productId;

		req.user.getCart()
			.then((cart) => {
				return cart.getProducts({where: {id: productId}});
			})
			.then((products) => {
				return products[0].CartItem.destroy()
			})
			.then(() => res.redirect('/cart'))
			.catch((err) => console.log(err));
	};

	postOrder = (req, res, next) => {
		let userCart;

		req.user.getCart()
			.then((cart) => {
				userCart = cart;
				return cart.getProducts();
			})
			.then((products) => {
				return req.user.createOrder()
					.then((order) => {
						const orderProducts = products.map((product) => {
							product.OrderItem = {quantity: product.CartItem.quantity}
							return product;
						});
						return order.addProducts(orderProducts);
					})
					.then(() => {
						return userCart.removeProducts();
					})
					.catch((err) => console.log(err));
			})
			.then(() => res.redirect('/orders'))
			.catch((err) => console.log(err));
	}

	getOrders = (req, res, next) => {
		req.user.getOrders({include: ['Products']})
			.then((orders) => {
				res.render('shop/orders', {
					path: '/orders',
					title: 'Your Orders',
					orders
				});
			})
			.catch((err) => console.log(err));
	};


	getCheckout(req, res) {
		res.render('shop/checkout', {
			title: 'Checkout',
			path: '/checkout'
		})
	};
}
