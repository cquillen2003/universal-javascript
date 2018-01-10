import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDocs } from '../../../../actions';
import TodoNew from './component';

class TodoNewContainer extends Component {

	componentDidMount() {
		this.props.dispatch({ type: 'PLEASE_WORK', data: 'FUCK!' });
	}

	render() {
		console.log('TodoNewContainer.render()...', this.props);
		return (
			<TodoNew { ...this.props }/>
		)
	}

}

export default connect()(TodoNewContainer);