import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
	'node-complete',
	'root',
	'myserver123',
	{host: 'localhost', dialect: 'mysql'}
);

export default sequelize;
