import { MongoClient } from 'mongodb';
//import { Client } from 'pg';

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

/*
async function connect() {
	try {
		//TODO: Use pool instead per Heroku docs (?)
		var client = new Client({
			connectionString: process.env.DATABASE_URL //Environment var automatically added by Heroku add-on
		});
		
		client.connect();
		console.log('\n\n' + 'Connected to pg database successfully.' + '\n');

		return client;
	}
	catch (error) {
		console.log('\n' + 'Error connecting to database!' + '\n');
		console.log(error);
	}
}
*/

export default connect;