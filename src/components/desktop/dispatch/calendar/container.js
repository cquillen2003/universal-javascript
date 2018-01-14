import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from './component';

class CalendarContainer extends Component {

	render() {
		return (
			<Calendar { ...this.props }/>
		)
	}

}

function mapStateToProps(state) {
	return {
		todos: state.db.todo.ids.map(id => state.db.todo.docs[id])
	}
}

export default connect(mapStateToProps)(CalendarContainer);
