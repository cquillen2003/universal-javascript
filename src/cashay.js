import axios from 'axios';
import diff from 'deep-diff';
//import { GraphQLNormalizr } from 'graphql-normalizr';

/*
Trying a simplified approach to caching GraphQL requests and keeping
Redux pattern that I currently have.

Simplifying assumptions:
-Always re-query the cache at least, maybe the server
	-Queries are cheap against the cache
	-Could always re-query the server and diff response with cache query response 
	(using NPM diff package) and only re-render if different

Required functions/logic (TODOs):
-Return __typename in query respones by default (later)
-Normalize and cache query response
-Query cache (including simple hit vs miss logic)

-Or, even simpler, only cache de-normalized results
and always re-fetch behind it (like I currently do)
*/

//var { normalize } = new GraphQLNormalizr();

function loadQuery(query) {
	return async function(dispatch, getState) {
		var res = await axios.post('/graphql', {
			query: query
		});

		console.log('GraphQL query response', res);

		//var normalized = normalize(res.data);

		//console.log('Normalized response', normalized);

		var existingData = getState().queries[query] ? getState().queries[query].data : {};

		var differences = diff(existingData, res.data.data);

		console.log('Differences are', differences);
		
		if (differences) {
			dispatch({ 
				type: 'LOAD_QUERY', 
				payload: { 
					query: query, //Use query string as key for now //TODO: Use checksum or something and include variables
					data: res.data.data 
				} 
			});
		}
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

		this.store.dispatch(loadQuery(query));

		if (this.store.getState().queries[query]) {
			return {
				loaded: true,
				data: this.store.getState().queries[query].data
			}
		}
		else {
			return {
				loaded: false,
				data: []
			}
		}
	}

	async mutate() {
		console.log('mutate()...');
	}
}

export default new Client();