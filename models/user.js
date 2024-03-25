import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	cart: {
		items: [{
			productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
			quantity: { type: Number, required: true }
		}]
	}
});

UserSchema.methods.addToCart = function (productToAdd) {
	const existedProductIndex = this.cart ? this.cart.items.findIndex((product) => product.productId.toString() === productToAdd._id.toString()) : -1;
	let newQuantity = 1;
	const newCartItems = this.cart ? [...this.cart.items] : [];

	if (existedProductIndex >= 0) {
		newQuantity = newCartItems[existedProductIndex].quantity + 1;
		newCartItems[existedProductIndex].quantity = newQuantity;
	} else {
		newCartItems.push({
			productId: productToAdd._id,
			quantity: newQuantity
		});
	}

	this.cart = { items: newCartItems };

	return this.save();
};

UserSchema.methods.deleteCartItem = function (productId) {
	this.cart.items = this.cart.items.filter((item) => item.productId.toString() !== productId.toString());

	return this.save();
};

UserSchema.methods.clearCart = function () {
	this.cart = {items: []};

	return this.save();
};

const UserModel = model('User', UserSchema);

export default UserModel;
