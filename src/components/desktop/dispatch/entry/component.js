import React, { Component } from 'react';

class Entry extends Component {

	getStyles(props) {
		return {
			width: '300px', //TODO: f(time, cell width)
			padding: '0.2rem',
			color: 'white',
			backgroundColor: 'red',
			opacity: props.isDragging ? 0 : 1
		}
	}

	render() {
		return (
			<div style={this.getStyles(this.props)}>
				{ this.props.todo.name }
			</div>
		)
	}
}

export default Entry;