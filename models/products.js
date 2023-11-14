import path from 'path';
import {readFile, writeFile} from 'fs';

const filePath = path.join(process.cwd(), 'data', 'products.json');

export default class ProductsModel {
	constructor(title, imageUrl, price, description) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.price = price;
		this.description = description;
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
