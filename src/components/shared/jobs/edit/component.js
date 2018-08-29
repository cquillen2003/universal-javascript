import React, { Component } from 'react';
import { updateDoc } from '../../../../actions';
import JobForm from '../form/component';

class JobEdit extends Component {

	constructor(props) {
		super(props);

		this.update = this.update.bind(this);
	}

	update(formState) {
		console.log('update()...', formState);

		//this.props.dispatch(updateDoc('job', this.props.todo));
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-6">
						<br/>
						<JobForm job={this.props.job} save={this.update}/>
					</div>
				</div>
			</div>
		)
	}

}

export default JobEdit;