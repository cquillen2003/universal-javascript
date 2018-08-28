var resolvers = {
	Query: {	
		hello: () => 'Hello world!',
		appointments: appointments,
		resources: resources
	},
	//Non-root resolvers can only be defined like this using graphql-tools
	//The reference implementation (graphql.js) handles non-root resolvers
	//in a very strange way
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

async function appointments(obj, args, context, info) {
	//console.log('appointments()....', obj, args, context.session);

	var sql = `
		SELECT * 
		FROM appointments
		INNER JOIN jobs ON appointments.job_id = jobs._id
		INNER JOIN jobcustomers ON appointments.job_id = jobcustomers.job_id
		INNER JOIN jobaddresses ON appointments.job_id = jobaddresses.job_id
		WHERE appointments.company_id = $1::int
	`;
	var values = [context.session.company_id];

	//TODO: Wrap in try/catch
	var res = await context.db.query(sql, values);

	return res.rows;
}

async function resources(obj, args, context, info) {
	var sql = `
		SELECT *
		FROM resources
		WHERE company_id = $1::int
	`;
	var values = [context.session.company_id];

	var res = await context.db.query(sql, values);

	return res.rows;
}

export default resolvers;