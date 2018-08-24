import { MongoClient } from 'mongodb';

//https://blog.mlab.com/2017/05/mongodb-connection-pooling-for-express-applications/

var url = process.env.MONGO_DB_URL + '/test?retryWrites=true';
var database = 'myproject';

async function connect() {
	try {
		var client = await MongoClient.connect(url, {
			useNewUrlParser: true
		});
		var db = client.db(database);
		console.log('\n\n' + 'Connected to ' + database + ' database successfully.' + '\n');
		return db;
	}
	catch (error) {
		console.log('\n' + 'Error connecting to database!' + '\n');
		console.log(error);
	}
}

export default connect;