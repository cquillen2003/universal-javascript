require('babel-register');
require('babel-polyfill');

var connect = require('../../db').default;
var newJobs = require('./new-jobs');

connect().then(db => {

	var jobs = newJobs(1, 5);
	
	jobs.forEach(job => {
		createJob(db, job);
	})

});

async function createJob(db, job) {
	console.log('createJob() ', job);
	var start = Date.now();

	//Create job record
	var sql = `
		INSERT INTO jobs (company_id, number)
		VALUES ($1, $2)
		RETURNING *
	`;
	var values = [job.company_id, 'tbd'];

	var res1 = await db.query(sql, values);

	//Create job customer record
	var sql = `
		INSERT INTO jobcustomers (company_id, job_id, name)
		VALUES ($1, $2, $3)
		RETURNING *
	`
	var values = [job.company_id, res1.rows[0]._id, job.customer.name];

	var res2 = await db.query(sql, values);

	//Create job address record
	var sql = `
		INSERT INTO jobaddresses (company_id, job_id, street)
		VALUES ($1, $2, $3)
		RETURNING *
	`
	var values = [job.company_id, res1.rows[0]._id, job.job_address.street];

	var res3 = await db.query(sql, values);

	//Create appointment record
	var sql = `
		INSERT INTO appointments (company_id, job_id, start_time, duration)
		VALUES ($1, $2, $3, $4)
		RETURNING *
	`
	var values = [job.company_id, res1.rows[0]._id, '7:00am', 3];

	var res4 = await db.query(sql, values);

	var ms = Date.now() - start;
	console.log(`Job created in ${ms} ms`);
}