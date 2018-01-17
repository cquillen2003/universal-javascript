import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import DraggableCard from '../card/drag-source';

/*
Using a single drop target for sortable rather than using the technique in the
React DnD docs because this enables dropping onto the bottom of a list or onto
and empty list.  Ultimately it uses the same logic though.
*/

class DispatchList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			todos: this.props.todos.filter(todo => !todo.resource || !todo.hour)
		};

		this.moveCard = this.moveCard.bind(this);
		this.findCard = this.findCard.bind(this);
		this.addCard = this.addCard.bind(this);
	}

	componentDidMount() {
		var firstCard = this.el.firstChild;
		this.props.setCard(firstCard);
	}

	moveCard(dragIndex, targetIndex) {
		var newTodos = [...this.state.todos];

		//Remove dragged item
		var item = newTodos.splice(dragIndex, 1)[0];

		//Add dragged item to new position
		newTodos.splice(targetIndex, 0, item);

		this.setState({ todos: newTodos });
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

	render() {
		return this.props.connectDropTarget(
			<div ref={(el) => { this.el = el; }} style={{ height: '500px' }}>
				{ this.state.todos.map((todo) => (
					<DraggableCard key={todo._id} todo={todo} item={this.props.item}/>
				)) }
			</div>
		)
	}
}

//Drop target spec
var spec = {
	hover: function(props, monitor, component) {
		var mouse = monitor.getClientOffset();

		for (var i = 0; i < component.el.children.length; i++) {
			var card = component.el.children[i].getBoundingClientRect();
			if (card.left < mouse.x && mouse.x < card.right) {
				if (card.top < mouse.y && mouse.y < card.bottom) {
					var targetIndex = i;
					break;
				}
			}
		}

		if (!targetIndex && targetIndex !== 0) {
			return;
		}

		if (monitor.getItemType() === 'card' || monitor.getItemType() === 'entry') {
			var sourceIndex = component.findCard(monitor.getItem().id);
			if (sourceIndex || sourceIndex === 0) {
				if (sourceIndex !== targetIndex) {
					console.log('moveCard()...');
					component.moveCard(sourceIndex, targetIndex);
				}
			}
		}

		if (monitor.getItemType() === 'entry') {
			if (component.findCard(monitor.getItem().id) === -1) {
				console.log('addCard()...');
				component.addCard(monitor.getItem().id, targetIndex);
			}
		}

	},
	drop: function(props, monitor, component) {
		if (monitor.getItemType() === 'entry') {
			var mouse = monitor.getClientOffset();
			var bottomCard = component.el.lastElementChild.getBoundingClientRect();
			var noCards = component.el.children.length;

			if (mouse.y > bottomCard.bottom || noCards === 0) {
				if (component.findCard(monitor.getItem().id) === -1) {
					console.log('addCard()...');
					component.addCard(monitor.getItem().id, noCards);
				}
			}
		}
	}
};

//Drop target collecting function
function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		item: monitor.getItem()
	}
}

export default DropTarget(['card', 'entry'], spec, collect)(DispatchList);