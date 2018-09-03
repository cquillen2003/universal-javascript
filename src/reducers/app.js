import { ids, docs, newDoc, loaded } from './db';

var initialState = {
	session: {},
	db: {
		job: { ids: [], docs: {}, loaded: false }
	},
	ui: {},
	results: {
		loaded: false,
		data: {}
	}
};

function rootReducer(state = initialState, action) {
	console.log(action.type);
	switch(action.type) {
		case 'CREATE_DOC_START':
		case 'CREATE_DOC_SUCCESS':
		case 'UPDATE_DOC_START':
		case 'UPDATE_DOC_SUCCESS':
		case 'LOAD_DOCS':
			return { 
				...state,
				db: {
					...state.db,
					[action.payload.docType]: {
						ids: ids(state.db[action.payload.docType].ids, action),
						docs: docs(state.db[action.payload.docType].docs, action),
						new: newDoc(state.db[action.payload.docType].new, action),
						loaded: loaded(state.db[action.payload.docType].loaded, action)
					}
				} 
			}
		case 'LOAD_QUERY':
			return {
				...state,
				results: action.payload
			}
		default:
			return state
	}
}

export default rootReducer