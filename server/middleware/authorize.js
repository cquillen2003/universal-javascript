function authorize() {
	return async (ctx, next) => {
		console.log('authorize()....');

		var token;

		token = ctx.cookies.get('AuthToken');

		//TODO: Use JSON web tokens
		if (token === 'abc123') {
			ctx.state.user = {
				id: 'admin'
			}
		}
		else {
			ctx.throw(401);
		}

		await next();
	}
}

export default authorize;