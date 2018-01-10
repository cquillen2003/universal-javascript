import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoEdit from './component';

class TodoEditContainer extends Component {

	render() {
		return (
			<TodoEdit { ...this.props }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	//TODO: Clone item to prevent mutation?
	return {
		todo: state.db.todo.docs[ownProps.match.params.id]
	}
}

export default connect(mapStateToProps)(TodoEditContainer);