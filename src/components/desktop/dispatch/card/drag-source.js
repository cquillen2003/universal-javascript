import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Card from './component';

class DraggableCard extends Component {

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true
		});
	}

	render() {
		return this.props.connectDragSource(
			<div>
				<Card { ...this.props }/>
			</div>
		)
	}
}

//Drag source spec
var spec = {
	beginDrag: function(props, monitor, component) {
		return {
			id: props.todo._id
		}
	}
};

//Drag source collecting function
function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview()
	}
}

export default DragSource('card', spec, collect)(DraggableCard);