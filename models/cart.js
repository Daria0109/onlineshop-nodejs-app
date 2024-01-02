import path from 'path';
import fs from 'fs';

const cartFilePath = path.join(process.cwd(), 'data', 'cart.json');

export default class CartModel {
	static addProduct(id, price) {
		fs.readFile(cartFilePath, (err, data) => {
			let cart = {products: [], totalPrice: 0};
			if (!err) {
				cart = JSON.parse(data);
			}
			const existingProductId = cart.products.findIndex(item => item.id === id);
			const existingProduct = cart.products[existingProductId];

			if (existingProduct) {
				cart.products = [...cart.products];
				cart.products[existingProductId] = {...existingProduct, quantity: existingProduct.quantity + 1};
			} else {
				const newProduct = {id, quantity: 1};
				cart.products = [...cart.products, newProduct];
			}
			cart.totalPrice = cart.totalPrice + Number(price);
			fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		})
	}

	static deleteProduct(id, price) {
		fs.readFile(cartFilePath, (err, data) => {
			if (err) {
				return console.log(err);
			}

			const cart = {...JSON.parse(data)};
			const deletedProductIndex = cart.products.findIndex(prod => prod.id === id);
			cart.totalPrice = cart.totalPrice - price * cart.products[deletedProductIndex].quantity;
			cart.products = cart.products.filter(prod => prod.id !== id);

			fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
				console.log(err);
			})
		});
	}

	static getCart(cb) {
		fs.readFile(cartFilePath, (err, data) => {
			if (err) {
				cb(null);
			} else {
				cb(JSON.parse(data));
			}
		});
	}
}
