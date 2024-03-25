import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
	products: [{
		product: {type: Object, required: true},
		quantity: {type: Number, required: true}
	}],
	user: {
		name: {type: String, required: true},
		userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
	}
});

const OrderModel = model('Order', OrderSchema);

export default OrderModel;
