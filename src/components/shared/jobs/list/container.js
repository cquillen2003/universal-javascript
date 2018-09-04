import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//import { fetchDocs } from '../../../../actions';
import JobList from './component';
import cashay from '../../../../cashay';

class JobListContainer extends Component {

	async fetchData(dispatch) {
		console.log('fetchData()...');
		await dispatch(fetchDocs('job'));
	}

	componentWillMount() {
		console.log('componentWillMount()...');
		if (this.props.staticContext) {
			this.props.staticContext.fetchers.push(this.fetchData);
		}
	}

	async componentDidMount() {
		console.log('componentDidMount()...');
		//this.fetchData(this.props.dispatch);
	}

	render() {
		console.log('render()...', this.props);
		if (!this.props.results.loaded) {
			return null;
		}

		return (
			<JobList jobs={this.props.results.data.jobs}/>
		)
	}

}

function mapStateToProps() {

	console.log('mapStateToProps()...');

	var query = `{
		jobs {
			id
			number
			customer {
				display_name
			}
			job_address {
				street1
			}
		}
	}`;

	return {
		//jobs: state.db.job.ids.map(id => state.db.job.docs[id]),
		//loaded: state.db.job.loaded,
		results: cashay.query(query)
	}
}

export default connect(mapStateToProps)(JobListContainer);