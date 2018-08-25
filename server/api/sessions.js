import Router from 'koa-router';
import jwt from 'jsonwebtoken';

var router = new Router();

//Hard code users for seed project
var users = [
	{ _id: 1, company_id: 1, username: 'john.doe', password: 'password' },
	{ _id: 2, company_id: 2, username: 'bill.smith', password: 'password' }
];

router.post('/sessions', async (ctx) => {
	console.log('/sessions route...', ctx.request.body);

	var user = users.find(user => user.username === ctx.request.body.user);

	if (user && user.password === ctx.request.body.password) {
		var token = jwt.sign({ company_id: user.company_id, username: user.username }, 'shhhhh');
		ctx.cookies.set('UjsAuthToken', token);
		
		ctx.redirect('/app/home');
	}
	else {
		ctx.throw(401);
	}
	
});

export default router;