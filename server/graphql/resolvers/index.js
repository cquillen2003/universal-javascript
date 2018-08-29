/*
Non-root resolvers (Job, Appointment, etc.) can only be defined like this using Apollo graphql-tools
The reference implementation (graphql.js) handles non-root resolvers in a strange with with a type Class
*/

var resolvers = {
	Query: {
		appointments: async (obj, args, context, info) => {
			var sql = `
				SELECT * 
				FROM appointments
				INNER JOIN jobs ON appointments.job_id = jobs._id
				INNER JOIN jobcustomers ON appointments.job_id = jobcustomers.job_id
				INNER JOIN jobaddresses ON appointments.job_id = jobaddresses.job_id
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
		closeJob: (obj, args) => {
			console.log('closeJob()...', obj, args.jobId);
			return {
				id: args.jobId
			}
		}
	},
	Appointment: {
		job: (obj, args) => {
			//console.log('job()...', obj, args);
			return {
				number: obj.number,
				customer: {
					name: obj.name
				},
				job_address: {
					street: obj.street
				}
			}
		}
	}
};

export default resolvers;