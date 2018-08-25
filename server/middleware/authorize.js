import jwt from 'jsonwebtoken';

function authorize() {
	return async (ctx, next) => {
		console.log('authorize()....');

		var token = ctx.cookies.get('UjsAuthToken');

		if (token) {
			try {
				var decodedToken = jwt.verify(token, 'shhhhh');
				if (decodedToken.username && decodedToken.company_id) {
					ctx.state.session = {
						username: decodedToken.username,
						company_id: decodedToken.company_id
					};
				}
			}
			catch (error) {
				console.log('Error caught in authorize()...', error);
				ctx.status = 401;
				ctx.body = { ok: false, msg: 'Unauthorized' };
			}
		}
		else {
			ctx.status = 401;
			ctx.body = { ok: false, msg: 'Unauthorized' };	
		}

		await next();
	}
}

export default authorize;