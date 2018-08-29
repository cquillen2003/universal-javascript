import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobEdit from './component';

class JobEditContainer extends Component {

	render() {
		return (
			<TodoEdit { ...this.props }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	//TODO: Clone item to prevent mutation?
	return {
		job: state.db.job.docs[ownProps.match.params.id]
	}
}

export default connect(mapStateToProps)(JobEditContainer);