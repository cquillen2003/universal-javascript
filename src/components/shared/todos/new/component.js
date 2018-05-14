import React, { Component } from 'react';
import Todo from '../../../../models/todo';
import { createDoc } from '../../../../actions';
import TodoForm from '../form/component';

class TodoNew extends Component {

	constructor(props) {
		super(props);

		this.create = this.create.bind(this);
	}

	async create(formState) {
		console.log('create()...', formState);
		
		var todo = new Todo({
			name: formState.name,
			description: formState.desc
		});

		this.props.dispatch(createDoc('todo', todo));
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-6">
						<br/>
						<TodoForm save={this.create}/>
					</div>
				</div>
			</div>
		)
	}

}

export default TodoNew;