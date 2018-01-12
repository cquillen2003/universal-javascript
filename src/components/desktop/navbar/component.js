import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<a className="navbar-brand" href="/app/home">Universal JS Desktop</a>
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to="/todos" className="nav-link">List</Link>
						</li>
						<li className="nav-item">
							<Link to="/todos/new" className="nav-link">New</Link>
						</li>
						<li className="nav-item">
							<Link to="/component" className="nav-link">Component</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}

}

export default Navbar;