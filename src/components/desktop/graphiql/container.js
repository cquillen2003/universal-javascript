import React, { Component } from 'react';
//import GraphiQL from 'graphiql'; //Not working.  See GitHub issue I posted.
import axios from 'axios';

class GraphiQLContainer extends Component {
	
	/*
	fetcher(graphQLParams) {
		console.log('fetcher()..', graphQLParams);
	}
	*/

	async runQuery() {
		console.log('runQuery()...');
		var res = await axios.post('/graphql', {});
		console.log(res.data);
	}

	render() {
		return (
			<div>
				<button onClick={this.runQuery} type="button" className="btn btn-primary">Run Query</button>
			</div>
		)
	}
}

export default GraphiQLContainer;