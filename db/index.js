import { MongoClient } from 'mongodb';

//https://blog.mlab.com/2017/05/mongodb-connection-pooling-for-express-applications/

//TODO: Use env vars
var url = 'mongodb://localhost:27017';
var database = 'myproject';

async function connect() {
	try {
		var client = await MongoClient.connect(url);
		var db = client.db(database);
		console.log('Connected to db successfully.');
		return db;
	}
	catch (error) {
		console.log('Error connecting to db!');
		console.log(error);
	}
}

export default connect;