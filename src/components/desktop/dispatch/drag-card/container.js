import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragCard from './component';

class DragCardContainer extends Component {

	render() {
		return (
			<DragCard { ...this.props }/>
		)
	}

}

function mapStateToProps(state, ownProps) {
	return {
		todo: state.db.todo.docs[ownProps.item.id]
	}
}

export default connect(mapStateToProps)(DragCardContainer);