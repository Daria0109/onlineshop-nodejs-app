import ProductModel from '../models/products.js';

export default class AdminController {
	getAddProduct(req, res) {
		res.render('admin/edit-product', {
			title: 'Add product',
			path: '/admin/add-product',
			editMode: false
		})
	}

	postAddProduct(req, res) {
		console.log(req.user)
		const { title, imageUrl, price, description } = req.body;
		const product = new ProductModel(title, price, imageUrl, description, null, req.user._id);

		product.save()
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch((err) => console.log(err));
	}

	getEditProducts(req, res) {
		const editMode = req.query.edit;

		if (!editMode) {
			return res.redirect('/');
		}

		const productId = req.params.productId;
		ProductModel
			.fetchById(productId)
			.then((data) => {
				res.render('admin/edit-product', {
					title: 'Edit product',
					path: '/admin/edit-product',
					product: data,
					editMode,
				});
			})
			.catch((err) => console.log(err));
	}

	postEditProducts = (req, res, next) => {
		const productId = req.params.productId;
		const {title, imageUrl, price, description} = req.body;

		const product = new ProductModel(title, price, imageUrl, description, productId);

		product.save()
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch((err) => console.log(err));
	};

	getProducts(req, res) {
		ProductModel
			.fetchAll()
			.then((data) => {
				res.render('admin/products', {
					products: data,
					title: 'Admin Products',
					path: '/admin/products'
				});
			})
			.catch((err) => console.log(err));
	}

	deleteProduct = (req, res, next) => {
		const productId = req.body.productId;

		ProductModel
			.deleteById(productId)
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch((err) => console.log(err));
	};
}
