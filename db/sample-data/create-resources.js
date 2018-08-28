require('babel-register');
require('babel-polyfill');

var connect = require('../../db').default;
var newResources = require('./new-resources');

connect().then(db => {

	var resources = newResources(1, 5);
	
	resources.forEach(resource => {
		createResource(db, resource);
	})

});

async function createResource(db, resource) {
	console.log('createResource ', resource);
	var start = Date.now();

	//Create job record
	var sql = `
		INSERT INTO resources (company_id, name)
		VALUES ($1, $2)
		RETURNING *
	`;
	var values = [resource.company_id, resource.name];

	var res = await db.query(sql, values);

	var ms = Date.now() - start;
	console.log(`Resource created in ${ms} ms`);
}