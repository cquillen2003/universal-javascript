import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import Card from '../card/component';
import CalendarEntry from '../entry/component';

class CustomDragLayer extends Component {

	constructor(props) {
		super(props);

		this.layerStyles = {
			position: 'fixed',
			pointerEvents: 'none',
			zIndex: 100,
			left: 0,
			top: 0,
			width: '100%',
			height: '100%'
		};
	}

	componentWillReceiveProps(nextProps) {
		//Set vars here so they aren't set each render cycle
		if ( nextProps.item && nextProps.item !== this.props.item) {
			this.todo = this.props.todos.find(todo => todo._id === nextProps.item.id);
			this.cardWidth = this.props.card.getBoundingClientRect().width;
		}
	}

	getItemStyles(props) {
		var x = props.currentOffset.x;
		var y = props.currentOffset.y;

		//TODO: Refactor var names
		var origin = props.origin.getBoundingClientRect();

		if (x > origin.x) {
			var xGrid = x - origin.x;
			var yGrid = y - origin.y;

			var xCells = Math.round(xGrid / origin.width);
			var yCells = Math.round(yGrid / origin.height);

			var xSnapped = xCells * origin.width;
			var ySnapped = yCells * origin.height;

			x = origin.x + xSnapped;
			y = origin.y + ySnapped;
		}

		return {
			transform: `translate(${x}px, ${y}px)`,
			WebkitTransform: `translate(${x}px, ${y}px)`
		};
	}

	renderItem(props) {
		if (props.currentOffset.x < 500)
			return (
				<Card todo={this.todo} width={this.cardWidth}/>
			)
		else {
			return (
				<CalendarEntry todo={this.todo}/>
			)
		}
	}

	render() {
		if (!this.props.currentOffset || !this.props.isDragging) {
			return null;
		}

		return (
			<div style={this.layerStyles}>
				<div style={this.getItemStyles(this.props)}>
					{ this.renderItem(this.props) }
				</div>
			</div>
		)
	}
}

//Drag layer collecting function
function collect(monitor) {
	return {
		item: monitor.getItem(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	}
}

export default DragLayer(collect)(CustomDragLayer);