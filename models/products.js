import path from 'path';
import {readFile, writeFile} from 'fs';

const filePath = path.join(process.cwd(), 'data', 'products.json');

export default class ProductsModel {
	constructor(product) {
		this.title = product.title
	}

	static fetchAll(callback) {
		readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
			if (err) {
				return callback([]);
			}
			callback(JSON.parse(data));
		});
	}

	save() {
		let products = [];
		readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
			if (!err) {
				products = JSON.parse(data);
			}
			products.push(this);
			writeFile(filePath, JSON.stringify(products), {}, (err) => {
				console.error(err);
			});
		});
	}
}
