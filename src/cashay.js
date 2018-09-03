import axios from 'axios';

function loadQuery(query) {
	return async function(dispatch) {
		var res = await axios.post('/graphql', {
			query: query
		});

		console.log('GraphQL response', res);
		
		dispatch({ 
			type: 'LOAD_QUERY', 
			payload: { 
				loaded: true, 
				data: res.data.data 
			} 
		});
	}
}

class Client {
	constructor() {
		console.log('Client.constructor()...');
		
		this.create = this.create.bind(this);
		this.query = this.query.bind(this);
		this.mutate = this.mutate.bind(this);
	}

	create(config) {
		console.log('Client.create()...');
		this.store = config.store;
	}

	query(query) {
		console.log('query()...');

		if (!this.store.getState().results.loaded) {
			this.store.dispatch(loadQuery(query));
		}
		return this.store.getState().results;
	}

	async mutate() {
		console.log('mutate()...');
	}
}

export default new Client();