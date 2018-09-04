import React, { Component } from 'react';
import axios from 'axios';
//import { createDoc } from '../../../../actions';
import JobForm from '../form/component';


class JobNew extends Component {

	constructor(props) {
		super(props);

		this.create = this.create.bind(this);
	}

	async create(formState) {
		console.log('create()...');

		var job = {
			customer: {
				display_name: formState.name
			},
			job_address: {
				street1: formState.street
			}
		};

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

		console.log('GraphQL mutation response', res);

		//this.props.dispatch(createDoc('job', job));
		
		this.props.history.push({ pathname: '/jobs' });
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-6">
						<br/>
						<JobForm save={this.create} history={this.props.history}/>
					</div>
				</div>
			</div>
		)
	}

}

export default JobNew;