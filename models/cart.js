import sequelize from '../util/datadase.js';
import Sequelize from 'sequelize';

const CartModel = sequelize.define('Cart', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	}
});

export default CartModel;
