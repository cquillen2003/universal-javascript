import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JobList extends Component {

	render() {
		var classes = 'list-group-item';

		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<br/>
						<ul className="list-group">
							{ this.props.jobs.map((job, i) => (
								<li key={i} className="list-group-item">
									<Link to={'/jobs/' + job._id + '/edit'} className="btn btn-link float-right">
										Edit
									</Link>
									<div>{ job.customer.name }</div>
									<div style={{ fontSize: '0.9rem' }}>{ job.job_address.street }</div>
								</li>
							)) }
						</ul>
					</div>
				</div>
			</div>
		)
	}

}

export default JobList;