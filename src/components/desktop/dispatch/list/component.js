import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import update from 'immutability-helper';
import { saveDoc } from '../../../../actions';
import Card from '../card/component';

class DispatchList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			todos: this.props.todos.filter(todo => !todo.resource || !todo.hour)
		};

		this.moveCard = this.moveCard.bind(this);
		this.findCard = this.findCard.bind(this);
		this.addCard = this.addCard.bind(this);
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

	schedule(todo) {
		this.props.dispatch(saveDoc('todo', todo));
	}

	render() {
		return this.props.connectDropTarget(
			<div ref={(el) => { this.el = el; }} style={{ height: '500px', backgroundColor: 'gray' }}>
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
		)
	}

}

var spec = {
	hover: function(props, monitor, component) {
		console.log('DispatchList.hover()....');

		var dragIndex, mouse, childIndex, card, targetIndex;

		dragIndex = component.findCard(monitor.getItem().id);

		mouse = monitor.getClientOffset();

		for (childIndex = 0; childIndex < component.el.children.length; childIndex++) {
			card = component.el.children[childIndex].getBoundingClientRect();
			if (card.left < mouse.x && mouse.x < card.right) {
				if (card.top < mouse.y && mouse.y < card.bottom) {
					targetIndex = childIndex;
					break;
				}
			}
		}

		if (dragIndex !== -1) {
			if (dragIndex !== targetIndex) {
				component.moveCard(dragIndex, targetIndex);
			}
		}
		else {
			component.addCard(monitor.getItem().id, targetIndex);
		}

	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

export default DropTarget('card', spec, collect)(DispatchList);