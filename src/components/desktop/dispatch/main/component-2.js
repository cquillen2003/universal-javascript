import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { saveDoc } from '../../../../actions';
import CustomDragLayer from '../drag-layer/component';
import DispatchList from '../list/component';
import CalendarContainer from '../calendar/container';

class Dispatch extends Component {

	constructor(props) {
		super(props);

		//Keep references for live DOM measurements
		this.state = { 
			ref: null, //TODO: Rename origin
			card: null
		};

		this.setOrigin = this.setOrigin.bind(this);
		this.setCard = this.setCard.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	setOrigin(ref) {
		this.setState((prevState) => {
			return { ...prevState, ref: ref };
		});
	}

	setCard(ref) {
		this.setState((prevState) => {
			return { ...prevState, card: ref };
		});
	}

	cancel(todoId) {
		var todo = this.props.todos.find(todo => todo._id === todoId);

		//TODO: Don't mutate
		delete todo.resource;
		delete todo.hour;

		this.props.dispatch(saveDoc('todo', todo));
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<br/>
						<DispatchList todos={this.props.todos} setCard={this.setCard} cancel={this.cancel}/>
					</div>
					<div className="col-8">
						<br/>
						<CalendarContainer setOrigin={this.setOrigin}/>
					</div>
				</div>
				<CustomDragLayer
					todos={this.props.todos}
					card={this.state.card}
					origin={this.state.ref}
				/>
			</div>
		)
	}

}

export default DragDropContext(HTML5Backend)(Dispatch);