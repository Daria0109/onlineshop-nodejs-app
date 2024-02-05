import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://Darya:xCO0xLeNEKN70sLu@cluster1.w5hzgse.mongodb.net/?retryWrites=true&w=majority";

let _db;

export const mongoConnect = (callback) => {
	MongoClient.connect(uri)
		.then((client) => {
			console.log('Connected Mongo');
			_db = client.db();
			callback();
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
}

export const getDB = () => {
	if (_db) {
		return _db;
	}
	throw 'Database is not found!';
}



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	}
// });
//
// async function run() {
// 	try {
// 		// Connect the client to the server	(optional starting in v4.7)
// 		await client.connect();
// 		// Send a ping to confirm a successful connection
// 		await client.db("admin").command({ ping: 1 });
// 		console.log("Pinged your deployment. You successfully connected to MongoDB!");
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// run().catch(console.dir);


// CREATION MYSQL DB

// const sequelize = new Sequelize(
// 	'node-complete',
// 	'root',
// 	'myserver123',
// 	{host: 'localhost', dialect: 'mysql'}
// );
//
// export default sequelize;
