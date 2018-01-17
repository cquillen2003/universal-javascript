import React, { Component } from 'react';

class Card extends Component {

	getStyles(props) {
		return {
			width: this.props.width ? this.props.width : 'auto',
			marginBottom: '0.3rem',
			padding: '1rem',
			border: '1px solid gray',
			backgroundColor: 'white',
			opacity: props.item && props.item.id === props.todo._id ? 0 : 1
		};
	}

	render() {
		return (
			<div style={this.getStyles(this.props)}>
				{ this.props.todo.name }
			</div>
		)
	}
}

export default Card;