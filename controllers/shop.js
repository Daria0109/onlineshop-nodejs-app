import ProductsModel from '../models/products.js';
import CartModel from '../models/cart.js';

export default class ShopController {
	getIndex(req, res) {
		ProductsModel.fetchAll()
			.then(([rows, fields]) => {
				res.render('shop/index', {
					products: rows,
					title: 'Shop',
					path: '/'
				});
			})
			.catch((err) => console.log(err));
	}

	getProducts(req, res) {
		ProductsModel.fetchAll()
			.then(([rows, fields]) => {
				res.render('shop/index', {
					products: rows,
					title: 'Shop',
					path: '/'
				});
		})
			.catch((err) => console.log(err));

	}

	getProduct(req, res) {
		const productId = req.params.productId;

		ProductsModel.findById(productId)
			.then(([product]) => {
				res.render('shop/product-detail', {
					product: product[0],
					title: 'Product details',
					path: '/products'
				});
			})
			.catch((err) => console.log(err));
	}

	getCart(req, res) {
		CartModel.getCart(cart => {
			ProductsModel.fetchAll(products => {
					const cartProducts = [];
					for (const product of products) {
						const cartProduct = cart.products.find(prod => prod.id === product.id);
						if (cartProduct) {
							cartProducts.push({ product, quantity: cartProduct.quantity });
						}
					}
					res.render('shop/cart', {
						path: '/cart',
						title: 'Your Cart',
						products: cartProducts
					});
				});
			}
		);
	}

	postCart(req, res) {
		const prodId = req.body.productId;
		ProductsModel.findById(prodId, product => {
			CartModel.addProduct(prodId, product.price);
		});
		res.redirect('/cart');
	}

	deleteCartItem = (req, res, next) => {
		const productId = req.body.productId;

		ProductsModel.findById(productId, product => {
			CartModel.deleteProduct(productId, product.price);
			res.redirect('/cart');
		});
	};

	getCheckout(req, res) {
		res.render('shop/checkout', {
			title: 'Checkout',
			path: '/checkout'
		})
	};

	getOrders = (req, res, next) => {
		res.render('shop/orders', {
			path: '/orders',
			pageTitle: 'Your Orders'
		});
	};
}
