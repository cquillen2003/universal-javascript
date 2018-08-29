import React, { Component } from 'react';
//import axios from 'axios';
import { createDoc } from '../../../../actions';
import JobForm from '../form/component';

class JobNew extends Component {

	constructor(props) {
		super(props);

		this.create = this.create.bind(this);
	}

	async create(formState) {
		console.log('create()...', formState);

		var job = {
			customer: {
				name: formState.name
			},
			job_address: {
				street: formState.street
			}
		};

		/*
		var gql = `
			mutation myMutation($input: JobInput!) {
				createJob(input: $input) {
					id
				}
			}
		`;

		var res = await axios.post('/graphql', {
			query: gql,
			variables: { input: job }
		});
		*/

		this.props.dispatch(createDoc('job', job));
		
		this.props.history.push({ pathname: '/jobs' });
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-6">
						<br/>
						<JobForm save={this.create}/>
					</div>
				</div>
			</div>
		)
	}

}

export default JobNew;