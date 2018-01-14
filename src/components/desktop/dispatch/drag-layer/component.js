import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import DragCardContainer from '../drag-card/container';

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

	getItemStyles(props) {

		var styles = {
			backgroundColor: 'red',
			position: 'fixed',
			left: 0,
			top: 0
		};

		if (!props.currentOffset) {
			return {
				...styles,
				display: 'none'
			}
		}

		var x = props.currentOffset.x;
		var y = props.currentOffset.y;

		//TODO: Use values from Dispatch.state
		if (x > 857.5) {
			var xGrid = x - 857.5;
			var yGrid = y - 130;

			var xCells = Math.round(xGrid / 51);
			var yCells = Math.round(yGrid / 49);

			var xSnapped = xCells * 51;
			var ySnapped = yCells * 49;

			console.log('x cells', xCells);

			x = 857.5 + xSnapped;
			y = 130 + ySnapped;
		}

		return {
			...styles,
			transform: `translate(${x}px, ${y}px)`,
			WebkitTransform: `translate(${x}px, ${y}px)`
		};
	}

	render() {
		console.log('CustomDragLayer.render()...', this.props.isDragging);

		if (!this.props.isDragging) {
			return null;
		}

		console.log(this.props.item);

		return (
			<div style={this.layerStyles}>
				<div style={this.getItemStyles(this.props)}>
					<DragCardContainer item={this.props.item} offset={this.props.currentOffset}/>
				</div>
			</div>
		)
	}

}

function collect(monitor) {
	console.log('DragLayer collect()...');
	return {
		item: monitor.getItem(),
		initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	}
}

function mapStateToProps(state, ownProps) {
	console.log('mapStateToProps()...');
	return {}
}

export default DragLayer(collect)(CustomDragLayer);