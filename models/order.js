import sequelize from '../util/datadase.js';
import Sequelize from 'sequelize';

const OrderModel = sequelize.define('Order', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	}
});

export default OrderModel;
