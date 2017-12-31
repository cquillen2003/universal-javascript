import ids from './ids';
import docs from './docs';

function db(state, action) {
	switch(action.type) {
		case 'LOAD_DOCS':

			//Add "table" to db if necessary
			if (!state[action.payload.docType]) {
				state[action.payload.docType] = { ids: [], docs: {} };
			}

			return {
				...state,
				[action.payload.docType]: {
					ids: ids(state[action.payload.docType].ids, action),
					docs: docs(state[action.payload.docType].docs, action)
				}
			}
		default:
			return state;
	}
}

export default db;