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
		const { title, imageUrl, price, description } = req.body;
		const product = new ProductModel({
			title, price, imageUrl, description, userId: req.user
		});

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
			.findById(productId)
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

		ProductModel.findById(productId)
			.then((product) => {
				product.title = title;
				product.imageUrl = imageUrl;
				product.price = price;
				product.description = description;

				product.save()
			})
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch((err) => console.log(err));
	};

	getProducts(req, res) {
		ProductModel
			.find()
			.then((data) => {
				res.render('admin/products', {
					products: data,
					title: 'Admin Products',
					path: '/admin/products'
				});
			})
			.catch((err) => console.log(err)); f
	}

	deleteProduct = (req, res, next) => {
		const productId = req.body.productId;

		ProductModel
			.findByIdAndDelete(productId)
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch((err) => console.log(err));
	};
}
