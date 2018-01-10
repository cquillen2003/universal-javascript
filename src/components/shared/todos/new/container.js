import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoNew from './component';

class TodoNewContainer extends Component {

	render() {
		return (
			<TodoNew { ...this.props }/>
		)
	}

}

export default connect()(TodoNewContainer);