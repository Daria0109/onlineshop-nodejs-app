import ProductModel from '../models/products.js';
import UserModel from '../models/user.js';
import User from '../models/user.js';

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

		req.user.createProduct({
			title,
			imageUrl,
			price,
			description
		})
			.then(() => res.redirect('/'))
			.catch((err) => console.log(err));
	}

	getEditProducts(req, res) {
		const editMode = req.query.edit;

		if (!editMode) {
			return res.redirect('/');
		}

		const productId = req.params.productId;
		ProductModel
			.findAll({where: {id: productId}})
			.then((data) => {
				res.render('admin/edit-product', {
					title: 'Edit product',
					path: '/admin/edit-product',
					product: data[0],
					editMode,
				});
			})
			.catch((err) => console.log(err));
	}

	postEditProducts = (req, res, next) => {
		const productId = req.params.productId;
		const {title, imageUrl, price, description} = req.body;

		ProductModel
			.update({
				title,
				price,
				imageUrl,
				description
			}, {where: {id: productId}})
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch((err) => console.log(err));
	};

	getProducts(req, res) {
		ProductModel
			.findAll()
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
			.destroy({
				where: {id: productId}
			})
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch((err) => console.log(err));
	};
}
