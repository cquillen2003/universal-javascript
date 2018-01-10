import React, { Component } from 'react';
import { saveDoc } from '../../../../actions';
import TodoForm from '../form/component';

class TodoEdit extends Component {

	constructor(props) {
		super(props);

		this.update = this.update.bind(this);
	}

	update(formState) {
		console.log('update()...', formState);

		this.props.todo.name = formState.name;
		this.props.todo.description = formState.desc;

		this.props.dispatch(saveDoc('todo', this.props.todo));
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-6">
						<br/>
						<TodoForm todo={this.props.todo} save={this.update}/>
					</div>
				</div>
			</div>
		)
	}

}

export default TodoEdit;