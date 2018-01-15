import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

class Card extends Component {

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true
		});
	}

	getStyles(props) {
		return {
			width: '250px',
			marginBottom: '0.3rem',
			padding: '1rem',
			border: '1px solid gray',
			backgroundColor: 'white',
			opacity: props.isDragging || props.isOver ? 0: 1 //Added isOver for cards coming from calendar
		};
	}

	schedule(result) {
		//TODO: Don't mutate
		this.props.todo.resource = result.resource;
		this.props.todo.hour = result.hour;

		this.props.schedule(this.props.todo);
	}

	render() {
		return this.props.connectDragSource(
			this.props.connectDropTarget(
				<div style={this.getStyles(this.props)}>
					{ this.props.todo.name }
				</div>
			)
		)
	}

}

//Drag source
var sourceSpec = {
	beginDrag: function(props, monitor, component) {
		console.log('beginDrag()...', component);
		return {
			id: props.todo._id
		}
	},
	endDrag(props, monitor, component) {
		console.log('endDrag()...');

		//component.schedule(monitor.getDropResult());
	}
};

//Drop Target
var targetSpec = {
	hover: function(props, monitor, component) {
		console.log('hover()...');

		//Exit if hovering over calendar card
		if (!props.target) {
			return;
		}

		//Using the much simpler hover logic from 2nd sortable example
		var dragIndex = props.findCard(monitor.getItem().id);
		var targetIndex = props.findCard(props.todo._id);

		if (dragIndex !== -1) {
			if (dragIndex !== targetIndex) {
				props.moveCard(dragIndex, targetIndex);
			}
		}
		else {
			props.addCard(monitor.getItem().id, targetIndex);
		}
	}
}

function sourceCollect(connect, monitor) {
	//console.log('sourceCollect()...');
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview()
	}
}

function targetCollect(connect, monitor) {
	//console.log('targetCollect()...');
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}
}

export default DropTarget('card', targetSpec, targetCollect)(DragSource('card', sourceSpec, sourceCollect)(Card));