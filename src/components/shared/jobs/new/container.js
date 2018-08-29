import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobNew from './component';

class JobNewContainer extends Component {

	render() {
		return (
			<JobNew { ...this.props }/>
		)
	}

}

export default connect()(JobNewContainer);