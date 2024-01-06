import sequelize from '../util/datadase.js';
import Sequelize from 'sequelize';

const UserModel = sequelize.define('User', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

export default UserModel;
