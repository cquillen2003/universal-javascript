import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand fixed-bottom navbar-light bg-light">
				<div className="container">
					<ul className="navbar-nav d-flex justify-content-center">
						<li className="nav-item">
							<Link to="/jobs" className="nav-link">Jobs</Link>
						</li>
						<li className="nav-item">
							<Link to="/jobs/new" className="nav-link">New</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}

}

export default Navbar;