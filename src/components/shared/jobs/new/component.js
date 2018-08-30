import React, { Component } from 'react';
import axios from 'axios';
//import { createDoc } from '../../../../actions';
import JobForm from '../form/component';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class JobNew extends Component {

	constructor(props) {
		super(props);

		this.create = this.create.bind(this);
	}

	async create() {
		console.log('create()...');

		/*
		var job = {
			customer: {
				name: formState.name
			},
			job_address: {
				street: formState.street
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

		//this.props.dispatch(createDoc('job', job));
		
		this.props.history.push({ pathname: '/jobs' });
		*/
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-6">
						<br/>
						<Mutation mutation={gql`
							mutation myMutation($input: JobInput!) {
								createJob(input: $input) {
									id
								}
							}
						`}>
							{ (submit, result) => (
								<JobForm submit={submit} history={this.props.history}/>
							) }
						</Mutation>
					</div>
				</div>
			</div>
		)
	}

}

export default JobNew;