import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobEdit from './component';
import cashay from '../../../../cashay';

class JobEditContainer extends Component {

	render() {
		console.log('render()...', this.props);
		if (!this.props.results.loaded) {
			return null;
		}
		
		return (
			<JobEdit job={this.props.results.data.job} history={this.props.history}/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	
	var query = `{
		job(id: ${ownProps.match.params.id}) {
			id
			number
			customer {
				display_name
			}
			job_address {
				street1
			}
		}
	}`

	return {
		//TODO: Clone item to prevent mutation?
		//job: state.db.job.docs[ownProps.match.params.id]
		results: cashay.query(query)
	}
}

export default connect(mapStateToProps)(JobEditContainer);