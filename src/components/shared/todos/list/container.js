import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDocs } from '../../../../actions';
import TodoList from './component';

class TodoListContainer extends Component {

	async fetchData(dispatch) {
		console.log('fetchData()...');
		await dispatch(fetchDocs('todo'));
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