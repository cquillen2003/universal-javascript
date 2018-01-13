import React, { Component } from 'react';

class DragCard extends Component {

	getStyles(props) {
		return {
			width: props.offset && props.offset.x > 500 ? '600px' : '250px',
			padding: '1rem',
			border: '1px solid gray',
			backgroundColor: 'white'
		};
	}

	render() {
		console.log(this.props.offset);
		return (
			<div style={this.getStyles(this.props)}>
				{ this.props.todo.name }
			</div>
		)
	}

}

export default DragCard;