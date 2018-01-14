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
			opacity: props.isDragging ? 0: 1
		};
	}

	schedule(result) {
		//TODO: Don't mutate
		this.props.todo.resource = result.resource;
		this.props.todo.hour = result.hour;

		this.props.schedule(this.props.todo);
	}

	render() {
		var opacity = this.props.isDragging ? 0 : 1;

		return (
			this.props.connectDragSource(
				this.props.connectDropTarget(
					<div style={this.getStyles(this.props)}>
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
			id: props.todo._id,
			index: props.index
		}
	},
	endDrag(props, monitor, component) {
		console.log('endDrag()...');
		console.log(props.todo);
		console.log(monitor.getDropResult());

		component.schedule(monitor.getDropResult());
	}
};

function sourceCollect(connect, monitor) {
	//console.log('sourceCollect()...');
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview()
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