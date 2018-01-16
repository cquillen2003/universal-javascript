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

	schedule(result) {
		//TODO: Don't mutate
		this.props.todo.resource = result.resource;
		this.props.todo.hour = result.hour;

		this.props.schedule(this.props.todo);
	}

	render() {
		return this.props.connectDragSource(
			<div>
				<Card todo={this.props.todo}/>
			</div>
		)
	}

}

//Drag source spec
var spec = {
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

//Drag source collecting function
function collect(connect, monitor) {
	//console.log('sourceCollect()...');
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview()
	}
}

export default DragSource('card', spec, collect)(DraggableCard);