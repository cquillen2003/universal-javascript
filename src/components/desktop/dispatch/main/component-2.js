import React, { Component } from 'react';
import Card from '../card/component';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';
import CustomDragLayer from '../drag-layer/component';
import Calendar from '../calendar/component';

class Dispatch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			todos: this.props.todos,
			x: null,
			y: null
		};

		this.moveCard = this.moveCard.bind(this);
		this.setOrigin = this.setOrigin.bind(this);
	}

	/*
	moveCard(dragIndex, hoverIndex) {
		var newTodos = [...this.state.todos];

		//Remove dragged item
		var item = newTodos.splice(dragIndex, 1)[0];
		console.log('Item to move', item);

		//Add dragged item to new position
		newTodos.splice(hoverIndex, 0, item);
		console.log('newTodos', newTodos);

		this.setState({ todos: newTodos });
	}
	*/

	moveCard(dragIndex, hoverIndex) {
		console.log('moveCard()...');
		const { todos } = this.state
		const dragCard = todos[dragIndex]

		this.setState(
			update(this.state, {
				todos: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
				},
			})
		)
	}

	setOrigin(x, y) {
		this.setState((prevState) => {
			return {
				...prevState,
				x: x,
				y: y
			};
		});
	}

	render() {
		console.log('Dispatch.render()...');

		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<br/>
						{ this.state.todos.map((todo, i) => (
							<Card key={todo._id} index={i} todo={todo} moveCard={this.moveCard}/>
						)) }
						
					</div>
					<div className="col-8">
						<br/>
						<Calendar setOrigin={this.setOrigin}/>
					</div>
				</div>
				<CustomDragLayer/>
			</div>
		)
	}

}

export default DragDropContext(HTML5Backend)(Dispatch);