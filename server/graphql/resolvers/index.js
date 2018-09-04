/*
Non-root resolvers (Job, Appointment, etc.) can only be defined like this using Apollo graphql-tools
The reference implementation (graphql.js) handles non-root resolvers in a strange with with a type Class
*/

var resolvers = {
	Query: {
		jobs: async (obj, args, context) => {
			var sql = `
				SELECT 
					jobs._id AS id, 
					jobs.number,
					job_customers._id AS job_customer_id, 
					job_customers.display_name,
					job_addresses._id AS job_address_id, 
					job_addresses.street1
				FROM jobs
				INNER JOIN job_customers ON jobs._id = job_customers.job_id
				INNER JOIN job_addresses ON jobs._id = job_addresses.job_id
				WHERE jobs.company_id = $1::int
			`;
			var res = await context.db.query(sql, [context.session.company_id]);
		
			return res.rows;
		},
		job: async (obj, args, context) => {
			console.log('job()...', args);
			var sql = `
				SELECT 
					jobs._id AS id, 
					jobs.number,
					job_customers._id AS job_customer_id, 
					job_customers.display_name,
					job_addresses._id AS job_address_id, 
					job_addresses.street1
				FROM jobs
				INNER JOIN job_customers on jobs._id = job_customers.job_id
				INNER JOIN job_addresses on jobs._id = job_addresses.job_id
				WHERE jobs._id = $1::int
				AND jobs.company_id = $2::int
			`;
			var res = await context.db.query(sql, [args.id, context.session.company_id]);

			return res.rows[0];
		},
		appointments: async (obj, args, context, info) => {
			var sql = `
				SELECT * 
				FROM appointments
				INNER JOIN jobs ON appointments.job_id = jobs._id
				INNER JOIN job_customers ON appointments.job_id = job_customers.job_id
				INNER JOIN job_addresses ON appointments.job_id = job_addresses.job_id
				WHERE appointments.company_id = $1::int
			`;
			var res = await context.db.query(sql, [context.session.company_id]);
		
			return res.rows;
		},
		resources: async (obj, args, context, info) => {
			var sql = `
				SELECT *
				FROM resources
				WHERE company_id = $1::int
			`;
			var res = await context.db.query(sql, [context.session.company_id]);
		
			return res.rows;
		}
	},
	Mutation: {
		createJob: async (obj, args, context) => {
			console.log('createJob()...', obj, args);

			//Create job record
			var sql = `
				INSERT INTO jobs (company_id, number)
				VALUES ($1, $2)
				RETURNING *
			`;
			var res1 = await context.db.query(sql, [context.session.company_id, '701']);

			//Create job customer record
			var sql = `
				INSERT INTO job_customers (company_id, job_id, display_name)
				VALUES ($1, $2, $3)
				RETURNING *
			`;
			var res2 = await context.db.query(sql, [context.session.company_id, res1.rows[0]._id, args.input.customer.display_name]);

			//Create job address record
			var sql = `
				INSERT INTO job_addresses (company_id, job_id, street1)
				VALUES ($1, $2, $3)
				RETURNING *
			`;
			var values = [context.session.company_id, res1.rows[0]._id, args.input.job_address.street1];

			var res3 = await context.db.query(sql, values);

			console.log('Return from createJob()...', res1.rows[0]);
			return {
				id: res1.rows[0]._id
			}
		},
		updateJob: async (obj, args, context) => {
			console.log('updateJob()...', obj, args);

			//Get customer and job_address ids for update
			var sql = `
				SELECT
					job_customers._id AS job_customer_id,
					job_addresses._id AS job_address_id
				FROM jobs
				INNER JOIN job_customers ON jobs._id = job_customers.job_id
				INNER JOIN job_addresses ON jobs._id = job_addresses.job_id
				WHERE jobs._id = $1
			`;
			var res1 = await context.db.query(sql, [args.id]);

			//Update job customer
			var sql = `
				UPDATE job_customers
				SET
					display_name = $1
				WHERE _id = $2
			`;
			var res2 = await context.db.query(sql, [args.input.customer.display_name, res1.rows[0].job_customer_id]);

			//Update job address
			var sql = `
				UPDATE job_addresses
				SET
					street1 = $1
				WHERE _id = $2
			`;
			var res3 = await context.db.query(sql, [args.input.job_address.street1, res1.rows[0].job_address_id]);

			return {
				id: args.id
			}
		}		
	},
	Job: {
		customer: (obj) => {
			console.log('Job resolver...', obj);
			return {
				id: obj.job_customer_id,
				display_name: obj.display_name
			}
		},
		job_address: (obj) => {
			return {
				id: obj.job_address_id,
				street1: obj.street1
			}
		}
	},
	Appointment: {
		job: (obj, args) => {
			return obj;
		}
	}
};

export default resolvers;