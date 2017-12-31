import db from './db';
import ui from './ui';

var initialState = {
	session: {},
	db: {},
	ui: {}
};

export function app(state = initialState, action) {
	switch(action.type) {
		case 'LOAD_DOCS':
			return {
				db: db(state.db, action),
				ui: ui(state.ui, action)
			}
		default:
			return state;
	}
}

export default app;