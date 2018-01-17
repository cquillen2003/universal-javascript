import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Entry from './component';

class DraggableEntry extends Component {

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true
		});
	}

	render() {
		return this.props.connectDragSource(
			<div>
				<Entry { ...this.props }/>
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
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	}
}

export default DragSource('entry', spec, collect)(DraggableEntry);