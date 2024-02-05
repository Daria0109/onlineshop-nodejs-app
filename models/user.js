import { getDB } from '../util/datadase.js';
import { ObjectId } from 'mongodb';

const collectionName = 'users';

class UserModel {
	constructor(username, email, cart, id) {
		this.username = username;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}

	save() {
		return getDB().collection(collectionName)
			.insertOne(this)
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	addToCart(productId) {
		const existedProductIndex = this.cart ? this.cart.items.findIndex((product) => product.productId.toString() === productId.toString()) : -1;
		let newQuantity = 1;
		const newCartItems = this.cart ? [...this.cart.items] : [];


		if (existedProductIndex >= 0) {
			newQuantity = newCartItems[existedProductIndex].quantity + 1;
			newCartItems[existedProductIndex].quantity = newQuantity;
		} else {
			newCartItems.push({
				productId: new ObjectId(productId),
				quantity: newQuantity
			})
		}

		const updatedCart = { items: newCartItems };

		return getDB().collection(collectionName)
			.updateOne({_id: new ObjectId(this._id)}, {$set: { cart: updatedCart }})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}

	getCart() {
		if (!this.cart || !this.cart.items.length) {
			return Promise.resolve([]);
		}

		const productsIds = this.cart.items.map((item) => item.productId);

		return getDB().collection('products')
			.find({_id : {$in: productsIds}})
			.toArray()
			.then((data) => {
				return data.map((product) => {
					const quantity = this.cart.items.find((item) => {
						return item.productId.toString() === product._id.toString()
					}).quantity;
					return {...product, quantity};
				})
			})
			.catch((err) => console.log(err));
	}

	deleteCartItem(productId) {
		const filteredCartItems = this.cart.items.filter((item) => item.productId.toString()  !== productId.toString());

		return getDB().collection(collectionName)
			.updateOne({_id: new ObjectId(this._id)}, {$set: {cart: {items: filteredCartItems}}})
			.then(() => console.log(`${productId} deleted!`))
			.catch((err) => console.log(err));
	}

	getOrders() {
		return getDB().collection('orders')
			.find({'user._id': new ObjectId(this._id)})
			.toArray()
			.then((data) => data)
			.catch((err) => console.log(err));
	}

	addOrder() {
		return this.getCart()
			.then((data) => {
				const order =  {
						items: data,
						user: {
							_id: new ObjectId(this._id),
							name: this.username
						}
					};
				return getDB().collection('orders').insertOne(order);
			})
			.then(() => {
				return getDB().collection(collectionName)
					.updateOne({_id: new ObjectId(this._id)}, {$set: {cart: {items: []}}})
			})
			.then(() => console.log('Moved cart to orders'))
			.catch((err) => console.log(err));
	}

	static findById(id) {
		return getDB().collection(collectionName)
			.findOne({_id: new ObjectId(id)})
			.then((data) => data)
			.catch((err) => console.log(err));
	}

}

export default UserModel;
