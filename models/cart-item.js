import sequelize from '../util/datadase.js';
import Sequelize from 'sequelize';

const CartItemModel = sequelize.define('CartItem', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	quantity: Sequelize.INTEGER
});

export default CartItemModel;
