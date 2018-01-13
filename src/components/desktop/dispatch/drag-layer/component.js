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

		var currentOffset = props.currentOffset;

		if (!currentOffset) {
			return {
				...styles,
				display: 'none'
			}
		}

		return {
			...styles,
			transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
			WebkitTransform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
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
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging()
	}
}

function mapStateToProps(state, ownProps) {
	console.log('mapStateToProps()...');
	return {}
}

export default DragLayer(collect)(CustomDragLayer);