import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { saveDoc } from '../../../../actions';
import DraggableEntry from '../entry/drag-source';
import './component.css';

class Calendar extends Component {

	constructor(props) {
		super(props);

		this.resources = ['John', 'Bill', 'Sara', 'Jane', 'Joe', 'Bob', 'Bill', 'Rob', 'CJ', 'BJ', 'TJ'];
		this.hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
	}

	componentDidMount() {
		var firstCell = this.tbody.firstChild.firstChild.nextSibling;
		var firstCellRect = firstCell.getBoundingClientRect();

		this.origin = firstCell; //TODO: Refactor var names

		this.props.setOrigin(firstCell);
	}

	schedule(result) {
		var todo = this.props.todos.find(todo => todo._id === result.id);

		//TODO: Don't mutate
		todo.resource = result.resource;
		todo.hour = result.hour;

		this.props.dispatch(saveDoc('todo', todo));
	}

	renderCell(resource, hour) {
		var todo = this.props.todos.find(todo => {
			return todo.resource === resource && todo.hour === hour;
		});

		if (todo) {
			return (
				<DraggableEntry todo={todo}/>
			)
		}
	}

	render() {
		return this.props.connectDropTarget(
			<div>
				<div style={{ overflowY: 'scroll'}}>
					<div className="d-flex">
						<div className="resource-cell">Resource</div>
						{ this.hours.map((hour, i) => (
							<div key={i} className="grid-cell">{ hour }</div>
						)) }
					</div>
				</div>
				<div ref={(el) => { this.tbody = el; }} style={{ height: '350px', overflowY: 'auto' }}>
					{ this.resources.map((resource, i) => (
						<div key={i} className="d-flex">
							<div className="resource-cell">{ resource }</div>
							{ this.hours.map((hour, i) => (
								<div key={i} className="grid-cell">
									{ this.renderCell(resource, hour) }
								</div>
							)) }
						</div>
					)) }
				</div>
			</div>
		)
	}

}

var spec = {
	drop: function(props, monitor, component) {
		console.log('drop()...', monitor.getSourceClientOffset());

		var x = monitor.getSourceClientOffset().x;
		var y = monitor.getSourceClientOffset().y;

		var origin = component.origin.getBoundingClientRect();

		var xGrid = x - origin.x;
		var yGrid = y - origin.y;

		var xCells = Math.round(xGrid / origin.width);
		var yCells = Math.round(yGrid / origin.height);

		console.log(component.resources[yCells]);
		console.log(component.hours[xCells]);

		//Set drop result for endDrag method
		var result = {
			id: monitor.getItem().id,
			resource: component.resources[yCells],
			hour: component.hours[xCells]
		}
		component.schedule(result);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}


export default DropTarget(['card', 'entry'], spec, collect)(Calendar);