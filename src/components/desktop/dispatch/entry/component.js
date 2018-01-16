import React, { Component } from 'react';

class Entry extends Component {

	getStyles(props) {
		return {
			width: '300px', //TODO: f(time, cell width)
			padding: '0.2rem',
			border: '1px solid red'
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