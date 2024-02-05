import { getDB } from '../util/datadase.js';
import { ObjectId } from 'mongodb';

export const collectionName = 'products';

class ProductModel {
	constructor(title, price, imageUrl, description, id, userId) {
		this.title = title;
		this.price = price;
		this.imageUrl = imageUrl;
		this.description = description;
		this._id = id ? new ObjectId(id) : undefined;
		this.userId = userId;
	}

	save() {
		const db = getDB().collection(collectionName);
		let operationResult;
		if (this._id) {
			// update
			operationResult = db.updateOne({ _id: this._id}, {$set: this});
		} else {
			// save
			operationResult = db.insertOne(this);
		}

		return operationResult
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	static fetchAll() {
		return getDB().collection(collectionName)
			.find()
			.toArray()
			.then((data) => data)
			.catch((err) => console.log(err));
	}

	static fetchById(id) {
		return getDB().collection(collectionName)
			.find({_id: new ObjectId(id)})
			// use next() to get the first element from findings or use findOne() only
			.next()
			.then((data) => data)
			.catch((err) => console.log(err));
	}

	static deleteById(id) {
		return getDB().collection(collectionName)
			.deleteOne({_id: new ObjectId(id)})
			.then(() => console.log('Deleted!'))
			.catch((err) => console.log(err));
	}
}

export default ProductModel;
