import React, { Component } from 'react';

class JobForm extends Component {

	constructor(props) {
		super(props);

		if (!props.todo) {
			this.state = {
				name: '',
				street: '',
				desc: ''
			};
		}
		else {
			this.state = {
				name: this.props.job.customer.name,
				street: this.props.job.address.street,
				desc: this.props.job.description
			};
		}

		this.change = this.change.bind(this);
		this.submit = this.submit.bind(this);
	}

	change(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	submit(event) {
		event.preventDefault();
		//this.props.save(this.state);

		var job = {
			customer: {
				name: this.state.name
			},
			job_address: {
				street: this.state.street
			}
		};

		this.props.submit({ variables: { input: job } });
		this.props.history.push({ pathname: '/jobs' });
	}

	render() {
		return (
			<form onSubmit={this.submit}>
				<div className="form-group">
					<label>Name</label>
					<input 
						type="text" 
						className="form-control" 
						name="name" 
						value={this.state.name}
						onChange={this.change}
					/>
				</div>
				<div className="form-group">
					<label>Address</label>
					<input 
						type="text" 
						className="form-control" 
						name="street" 
						value={this.state.street}
						onChange={this.change}
					/>
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea 
						className="form-control" 
						rows="3"
						name="desc"
						value={this.state.desc}
						onChange={this.change}
					/>
				</div>
				<button type="submit" className="btn btn-primary">Save</button>
			</form>
		)
	}

}

export default JobForm;