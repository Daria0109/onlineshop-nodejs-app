import mysql from 'mysql2';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'myserver123',
	database: 'node-complete'
});

export default pool.promise();
