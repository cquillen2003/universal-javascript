import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TodoList extends Component {

	render() {
		var classes = 'list-group-item d-flex justify-content-between align-items-center';

		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<br/>
						<ul className="list-group">
							{ this.props.todos.map(todo => (
								<li key={todo._id} className={classes}>
									{ todo.name }
									<Link to={'/todos/' + todo._id + '/edit'} className="btn btn-link">
										Edit
									</Link>
								</li>
							)) }
						</ul>
					</div>
				</div>
			</div>
		)
	}

}

export default TodoList;