import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class Dispatch extends Component {

	constructor(props) {
		super(props);
		this.state = { todos: this.props.todos };
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	reorder(list, start, end) {
		var result = Array.from(list);
		var [removed] = result.splice(start, 1);
		result.splice(end, 0, removed);

		return result;
	}

	onDragEnd(result) {
		console.log('onDragEnd()...', result);
		if (!result.destination) {
			return;
		}

		var todos = this.reorder(this.state.todos, result.source.index, result.destination.index);

		this.setState({ todos: todos });
	}

	getItemStyle(draggableStyle) {
		console.log('getItemStyle()...', draggableStyle);
		return {
			margin: '0 0 10px 0',
			padding: '20px',
			border: '1px solid gray',
			...draggableStyle
		}
	}

	render() {
		var classes = 'list-group-item d-flex justify-content-between align-items-center';

		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<br/>
						<DragDropContext onDragEnd={this.onDragEnd}>
							<Droppable droppableId="droppable">
								{ (provided, snapshot) => (
									<div ref={provided.innerRef}>
										{ this.state.todos.map((todo, index) => (
											<Draggable key={todo._id} draggableId={todo._id} index={index}>
												{ (provided, snapshot) => (
													<div>
														<div 
															ref={provided.innerRef} 
															{ ...provided.droppableProps }
															{ ...provided.dragHandleProps }
															style={this.getItemStyle(provided.draggableProps.style)}
														>
															{ todo.name }
														</div>
														{ provided.placeholder }
													</div>
												) }
											</Draggable>
										)) }
										{ provided.placeholder }
									</div>
								) }
							</Droppable>
						</DragDropContext>
					</div>
				</div>
			</div>
		)
	}

}

export default Dispatch;