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
				<Entry todo={this.props.todo}/>
			</div>
		)
	}
}

var spec = {
	beginDrag: function(props, monitor, component) {
		return {
			id: props.todo._id
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview()
	}
}

export default DragSource('entry', spec, collect)(DraggableEntry);