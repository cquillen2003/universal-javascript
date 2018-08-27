var root = {
	hello: () => 'Hello world!',
	appointments: appointments
};

//No obj param passed on root query
async function appointments(args, context) {
	console.log('appointments()....', args, context.session);

	var sql = `
		SELECT * 
		FROM appointments
		WHERE company_id = $1::int
	`;
	var values = [context.session.company_id];

	//TODO: Wrap in try/catch
	var res = await context.db.query(sql, values);

	return res.rows;
}

export default root;