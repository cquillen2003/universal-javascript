import React, { Component } from 'react';
import '../../../../vendor/bootstrap.min.css';
import './login.scss';

class Login extends Component {

	render() {
		return (
			<div className="page d-flex justify-content-center align-items-center">
				<div className="card">
					<div className="card-body">
						<form action="/sessions" method="post">
							<div className="form-group">
								<label>User ID</label>
								<input type="text" className="form-control" name="user"/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input type="text" className="form-control" name="password"/>
							</div>
							<button type="submit" className="btn btn-primary">Login</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

}

export default Login;