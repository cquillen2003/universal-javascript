import React, { Component } from 'react';
import Card from '../card/component';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';
import { saveDoc } from '../../../../actions';
import CustomDragLayer from '../drag-layer/component';
import CalendarContainer from '../calendar/container';

class Dispatch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			todos: this.props.todos.filter(todo => !todo.resource || !todo.hour),
			ref: null
		};

		this.moveCard = this.moveCard.bind(this);
		this.findCard = this.findCard.bind(this);
		this.addCard = this.addCard.bind(this);
		this.setOrigin = this.setOrigin.bind(this);
		this.schedule = this.schedule.bind(this);
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

	findCard(id) {
		var todos = this.state.todos;
		var card = todos.find(todo => todo._id === id);

		return todos.indexOf(card);
	}

	addCard(id, index) {
		var todo = this.props.todos.find(todo => todo._id === id);

		var newTodos = [...this.state.todos];
		newTodos.splice(index, 0, todo);

		this.setState((prevState) => {
			return {
				...prevState,
				todos: newTodos
			}
		});
	}

	setOrigin(ref) {
		this.setState((prevState) => {
			return {
				...prevState,
				ref: ref
			};
		});
	}

	schedule(todo) {
		this.props.dispatch(saveDoc('todo', todo));
	}

	render() {
		console.log('Dispatch.render()...');

		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<br/>
						{ this.state.todos.map((todo, i) => (
							<Card 
								key={todo._id}
								todo={todo}
								findCard={this.findCard} 
								moveCard={this.moveCard}
								addCard={this.addCard}
								schedule={this.schedule}
								target
							/>
						)) }
						
					</div>
					<div className="col-8">
						<br/>
						<CalendarContainer setOrigin={this.setOrigin}/>
					</div>
				</div>
				<CustomDragLayer origin={this.state.ref}/>
			</div>
		)
	}

}

export default DragDropContext(HTML5Backend)(Dispatch);