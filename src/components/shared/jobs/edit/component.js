import React, { Component } from 'react';
import axios from 'axios';
//import { updateDoc } from '../../../../actions';
import JobForm from '../form/component';

class JobEdit extends Component {

	constructor(props) {
		super(props);

		this.update = this.update.bind(this);
	}

	async update(formState) {
		console.log('update()...', this.props.job);

		var jobInput = {
			customer: {
				display_name: formState.name
			},
			job_address: {
				street1: formState.street
			}
		}

		var gql = `
			mutation myMutation($id: ID!, $input: JobInput!) {
				updateJob(id: $id, input: $input) {
					id
				}
			}
		`;

		var res = await axios.post('/graphql', {
			query: gql,
			variables: { id: this.props.job.id, input: jobInput }
		});

		console.log('GraphQL mutation response', res);		

		//this.props.dispatch(updateDoc('job', this.props.todo));

		this.props.history.push({ pathname: '/jobs' });
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