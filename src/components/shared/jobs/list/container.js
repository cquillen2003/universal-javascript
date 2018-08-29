import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchDocs } from '../../../../actions';
import JobList from './component';

class JobListContainer extends Component {

	constructor(props) {
		super(props);

		/*
		this.state = {
			loaded: false,
			jobs: []
		};
		*/
	}

	async fetchData(dispatch) {
		console.log('fetchData()...');

		await dispatch(fetchDocs('job'));

		/*
		var gql = `{
			jobs {
				customer {
					name
				}
				job_address {
					street
				}
			}
		}`;

		var res = await axios.post('/graphql', {
			query: gql
		});

		console.log('GraphQL response', res);

		this.setState({ loaded: true, jobs: res.data.data.jobs });
		*/
	}

	componentWillMount() {
		console.log('componentWillMount()...');
		if (this.props.staticContext) {
			this.props.staticContext.fetchers.push(this.fetchData);
		}
	}

	async componentDidMount() {
		console.log('componentDidMount()...');
		this.fetchData(this.props.dispatch);
	}

	render() {
		if (!this.props.loaded) {
			return null;
		}

		return (
			<JobList jobs={this.props.jobs}/>
		)
	}

}

function mapStateToProps(state) {
	return {
		jobs: state.db.job.ids.map(id => state.db.job.docs[id]),
		loaded: state.db.job.loaded
	}
}

export default connect(mapStateToProps)(JobListContainer);