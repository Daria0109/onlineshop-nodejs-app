import sequelize from '../util/datadase.js';
import Sequelize from 'sequelize';

const OrderItemModel = sequelize.define('OrderItem', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	quantity: Sequelize.INTEGER
});

export default OrderItemModel;
