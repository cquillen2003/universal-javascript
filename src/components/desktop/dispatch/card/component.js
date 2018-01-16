import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
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
			opacity: this.props.item && this.props.item.id === this.props.todo._id ? 0 : 1
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
			<div style={this.getStyles(this.props)}>
				{ this.props.todo.name }
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

export default DragSource('card', spec, collect)(Card);