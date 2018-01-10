import React, { Component } from 'react';

class TodoList extends Component {

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<br/>
						<ul className="list-group">
							{ this.props.todos.map(todo => (
								<li key={todo._id} className="list-group-item">{ todo.name }</li>
							)) }
						</ul>
					</div>
				</div>
			</div>
		)
	}

}

export default TodoList;