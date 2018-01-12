import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDocs } from '../../../../actions';
import Dispatch from './component-2';

class DispatchContainer extends Component {

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

	componentDidMount() {
		console.log('componentDidMount()...');
		this.fetchData(this.props.dispatch);
	}

	render() {
		console.log('DispatchContainer.render()....');
		if (!this.props.loaded) {
			return <p>Loading data...</p>
		}

		return (
			<Dispatch { ...this.props }/>
		)
	}

}

function mapStateToProps(state) {
	return {
		todos: state.db.todo.ids.map(id => state.db.todo.docs[id]),
		loaded: state.db.todo.loaded
	}
}

export default connect(mapStateToProps)(DispatchContainer);