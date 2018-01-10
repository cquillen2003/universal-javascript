import db from './db';
//import ui from './ui';

var initialState = {
	session: {},
	db: {
		todo: { ids: [], docs: {}, loaded: false }
	},
	ui: {}
};

function rootReducer(state = initialState, action) {
	console.log(action.type);
	switch(action.type) {
		case 'SAVE_DOC_START':
		case 'SAVE_DOC_SUCCESS':
		case 'LOAD_DOCS':
			return {
				...state,
				db: db(state.db, action)
			}
		default:
			return state
	}
}

export default rootReducer