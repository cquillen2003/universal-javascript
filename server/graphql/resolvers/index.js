/*
Non-root resolvers (Job, Appointment, etc.) can only be defined like this using Apollo graphql-tools
The reference implementation (graphql.js) handles non-root resolvers in a strange with with a type Class
*/

var resolvers = {
	Query: {
		jobs: async (obj, args, context) => {
			var sql = `
				SELECT *
				FROM jobs
				INNER JOIN job_customers ON jobs._id = job_customers.job_id
				INNER JOIN job_addresses ON jobs._id = job_addresses.job_id
				WHERE jobs.company_id = $1::int
			`;
			var res = await context.db.query(sql, [context.session.company_id]);
		
			return res.rows;
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
				INSERT INTO job_customers (company_id, job_id, name)
				VALUES ($1, $2, $3)
				RETURNING *
			`
			var res2 = await context.db.query(sql, [context.session.company_id, res1.rows[0]._id, args.input.customer.name]);

			//Create job address record
			var sql = `
				INSERT INTO job_addresses (company_id, job_id, street)
				VALUES ($1, $2, $3)
				RETURNING *
			`
			var values = [context.session.company_id, res1.rows[0]._id, args.input.job_address.street];

			var res3 = await context.db.query(sql, values);

			return {
				id: res1.rows[0]._id
			}
		}
	},
	Job: {
		customer: (obj) => {
			return {
				display_name: obj.display_name
			}
		},
		job_address: (obj) => {
			return {
				street1: obj.street1
			}
		}
	},
	Appointment: {
		job: (obj, args) => {
			//console.log('job()...', obj, args);
			return obj;
		}
	}
};

export default resolvers;