import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

var style = {
	margin: '0.3rem',
	padding: '1rem',
	border: '1px solid gray',
	backgroundColor: 'white'
};

class Card extends Component {

	render() {
		console.log('isDragging?', this.props.isDragging);

		var opacity = this.props.isDragging ? 0 : 1;

		return (
			this.props.connectDragSource(
				this.props.connectDropTarget(
					<div style={{ ...style, opacity }}>
						{ this.props.todo.name }
					</div>
				)
			)
		)
	}

}

//Drag source
var sourceSpec = {
	beginDrag: function(props) {
		//console.log('beginDrag()...', component);
		return {
			id: props.todo.id,
			index: props.index
		}
	}
};

function sourceCollect(connect, monitor) {
	//console.log('sourceCollect()...');
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

//Drop Target
var targetSpec = {
	hover: function(props, monitor, component) {
		//console.log('hover()...');

		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	}
}

function targetCollect(connect, monitor) {
	//console.log('targetCollect()...');
	return {
		connectDropTarget: connect.dropTarget()
	}
}

export default DropTarget('card', targetSpec, targetCollect)(DragSource('card', sourceSpec, sourceCollect)(Card));

//export default DragSource('card', sourceSpec, sourceCollect)(DropTarget('card', targetSpec, targetCollect)(Card));