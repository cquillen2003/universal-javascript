import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

class CustomDragLayer extends Component {

	render() {
		var x, y;

		var style = {
			position: 'fixed',
			left: 0,
			top: 0
		};

		if (this.props.currentOffset) {
			x = this.props.currentOffset.x;
			y = this.props.currentOffset.y;

			style = {
				...style,
				transform: `translate(${x}px, ${y}px)`,
				WebkitTransform: `translate(${x}px, ${y}px)`
			};
		}

		if (!this.props.isDragging) {
			return null;
		}

		return (
			<div style={style}>
				Drag Layer
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