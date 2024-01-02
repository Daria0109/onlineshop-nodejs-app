import ProductsModel from '../models/products.js';

export default class AdminController {
	getAddProduct(req, res) {
		res.render('admin/edit-product', {
			title: 'Add product',
			path: '/admin/add-product',
			editMode: false
		})
	}

	postAddProduct(req, res) {
		const {title, imageUrl, price, description} = req.body;
		const id = Math.random();
		const products = new ProductsModel(id, title, imageUrl, price, description);
		products.save()
			.then(([rows, fields]) => {
				console.log(rows)
				res.redirect('/');
			})
			.catch();
	}

	getEditProducts(req, res) {
		const editMode = req.query.edit;

		if (!editMode) {
			return res.redirect('/');
		}

		const productId = req.params.productId;
		ProductsModel.findById(productId, (product) => {
			res.render('admin/edit-product', {
				title: 'Edit product',
				path: '/admin/edit-product',
				editMode,
				product
			});
		});
	}

	postEditProducts = (req, res, next) => {
		const productId = req.params.productId;
		const {title, imageUrl, price, description} = req.body;
		const updatedProduct = new ProductsModel(productId, title, imageUrl, description, price);
		updatedProduct.save();

		res.redirect('/admin/products');
	};

	getProducts(req, res) {
		ProductsModel.fetchAll(products => {
			res.render('admin/products', {
				products,
				title: 'Admin Products',
				path: '/admin/products'
			});
		});
	}

	deleteProduct = (req, res, next) => {
		const productId = req.body.productId;

		ProductsModel.deleteById(productId);

		res.redirect('/admin/products');
	};
}
