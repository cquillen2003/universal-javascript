import React, { Component } from 'react';

class JobForm extends Component {

	constructor(props) {
		super(props);

		if (!props.job) {
			this.state = {
				name: '',
				street: '',
				desc: ''
			};
		}
		else {
			this.state = {
				name: this.props.job.customer.display_name,
				street: this.props.job.job_address.street1,
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
		this.props.save(this.state);
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