import path from 'path';
import fs, {readFile, writeFile} from 'fs';

import db from './../util/datadase.js';

const filePath = path.join(process.cwd(), 'data', 'products.json');

// export default class ProductsModel {
// 	constructor(id, title, imageUrl, price, description) {
// 		this.id = id.toString();
// 		this.title = title;
// 		this.imageUrl = imageUrl;
// 		this.price = price;
// 		this.description = description;
// 	}
//
// 	static fetchAll(callback) {
// 		readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
// 			if (err) {
// 				return callback([]);
// 			}
// 			callback(JSON.parse(data));
// 		});
// 	}
//
// 	static findById(id, callback) {
// 		readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
// 			if (err) {
// 				return callback({});
// 			}
//
// 			const product = JSON.parse(data).find(item => item.id === id);
// 			callback(product);
// 		});
// 	}
//
// 	save() {
// 		let products = [];
// 		readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
// 			if (this.id) {
// 				const existingProductIndex = products.findIndex(item => item.id === this.id);
// 				products[existingProductIndex] = this;
// 			} else {
// 				this.id = Math.random().toString();
// 				products.push(this);
// 			}
// 			writeFile(filePath, JSON.stringify(products), {}, (err) => {
// 				console.error(err);
// 			});
// 		});
// 	}
//
// 	static deleteById(id) {
// 		fs.readFile(p, (err, data) => {
// 			if (err) {
// 				return console.log(err);
// 			}
//
// 			const products = JSON.parse(data);
// 			const deletedProduct = products.find(prod => prod.id === id);
// 			const remainingProducts = products.filter(item => item.id !== id);
// 			fs.writeFile(p, JSON.stringify(remainingProducts), (err) => {
// 				if (!err) {
// 					Cart.deleteProduct(id, deletedProduct.price);
// 				}
// 			})
// 		});
// 	}
// }

export default class ProductsModel {
	constructor(id, title, imageUrl, price, description) {
		this.id = id.toString();
		this.title = title;
		this.imageUrl = imageUrl;
		this.price = price;
		this.description = description;
	}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static findById(id) {
		return db.execute('SELECT * FROM products WHERE products.id = ?',
			[id]);
	}

	save() {
		return db.execute('INSERT INTO products (title, imageUrl, price, description) VALUE(?, ?, ?, ?)',
			[this.title, this.imageUrl, this.price, this.description]);
	}

	static deleteById(id) {

	}
}
