import ids from './ids';
import docs from './docs';
import loaded from './loaded';

function db(state, action) {
	switch(action.type) {
		case 'SAVE_DOC_START':
		case 'SAVE_DOC_SUCCESS':
		case 'LOAD_DOCS':
			//Add "table" to db if necessary
			if (!state[action.payload.docType]) {
				state[action.payload.docType] = { ids: [], docs: {}, loaded: false };
			}

			return {
				...state,
				[action.payload.docType]: {
					ids: ids(state[action.payload.docType].ids, action),
					docs: docs(state[action.payload.docType].docs, action),
					loaded: loaded(state[action.payload.docType].loaded, action)
				}
			}
		default:
			return state
	}
}

export default db;