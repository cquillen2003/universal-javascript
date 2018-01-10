import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDocs } from '../../../../actions';
import TodoList from './component';

class TodoListContainer extends Component {

	componentDidMount() {
		console.log('componentDidMount()...');
		this.props.dispatch(fetchDocs('todo'));
	}

	render() {
		console.log('TodoListContainer.render()...', this.props);

		if (!this.props.loaded) {
			return <p>Loading data...</p>
		}

		return (
			<TodoList { ...this.props }/>
		)
	}

}

function mapStateToProps(state) {
	return {
		todos: state.db.todo.ids.map(id => state.db.todo.docs[id]),
		loaded: state.db.todo.loaded
	}
}

export default connect(mapStateToProps)(TodoListContainer);