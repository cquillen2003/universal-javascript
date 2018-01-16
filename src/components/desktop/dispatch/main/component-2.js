import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import CustomDragLayer from '../drag-layer/component';
import DispatchList from '../list/component';
import CalendarContainer from '../calendar/container';

class Dispatch extends Component {

	constructor(props) {
		super(props);

		this.state = { ref: null };

		this.setOrigin = this.setOrigin.bind(this);
	}

	setOrigin(ref) {
		this.setState({ ref: ref });
	}

	render() {
		console.log('Dispatch.render()...');

		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<br/>
						<DispatchList todos={this.props.todos}/>
					</div>
					<div className="col-8">
						<br/>
						<CalendarContainer setOrigin={this.setOrigin}/>
					</div>
				</div>
				<CustomDragLayer todos={this.props.todos} origin={this.state.ref}/>
			</div>
		)
	}

}

export default DragDropContext(HTML5Backend)(Dispatch);