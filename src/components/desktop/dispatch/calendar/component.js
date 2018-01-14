import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

class Calendar extends Component {

	constructor(props) {
		super(props);

		this.resources = ['John', 'Bill', 'Sara'];
		this.hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
	}

	componentDidMount() {
		var firstCell = this.tbody.firstChild.firstChild.nextSibling;
		var firstCellRect = firstCell.getBoundingClientRect();

		this.props.setOrigin(firstCellRect.x, firstCellRect.y);
	}

	render() {
		return this.props.connectDropTarget(
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Resource</th>
						{ this.hours.map((hour, i) => (
							<th key={i}>{ hour }</th>
						)) }
					</tr>
				</thead>
				<tbody ref={(el) => { this.tbody = el; }}>
					{ this.resources.map((resource, i) => (
						<tr key={i}>
							<th>{ resource }</th>
							{ this.hours.map((hour, i) => (
								<th key={i}></th>
							)) }
						</tr>
					)) }
				</tbody>
			</table>
		)
	}

}

var spec = {
	drop: function(props, monitor, component) {
		console.log('drop()...', monitor.getSourceClientOffset());
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}


export default DropTarget('card', spec, collect)(Calendar);