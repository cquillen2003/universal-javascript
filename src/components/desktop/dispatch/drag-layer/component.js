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
		console.log('CustomDragLayer.componentWillReceiveProps()....', nextProps);
		if ( nextProps.item && nextProps.item !== this.props.item) {
			console.log('find it!!!!!!!!!!!');
			this.todo = this.props.todos.find(todo => todo._id === nextProps.item.id);
		}
	}

	getItemStyles(props) {

		/*
		var styles = {
			position: 'fixed',
			left: 0,
			top: 0
		};
		*/

		/*
		if (!props.currentOffset) {
			return {
				...styles,
				display: 'none'
			}
		}
		*/

		var x = props.currentOffset.x;
		var y = props.currentOffset.y;

		//console.log(props.origin);
		//console.log(props.origin.getBoundingClientRect());

		//TODO: Refactor var names
		var origin = props.origin.getBoundingClientRect();

		//TODO: Use values from Dispatch.state
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
			//...styles,
			transform: `translate(${x}px, ${y}px)`,
			WebkitTransform: `translate(${x}px, ${y}px)`
		};
	}

	renderItem(props) {
		if (props.currentOffset.x < 500)
			return (
				<Card todo={this.todo} />
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

function collect(monitor) {
	return {
		item: monitor.getItem(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	}
}

export default DragLayer(collect)(CustomDragLayer);