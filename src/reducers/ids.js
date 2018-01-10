function ids(state, action) {
	switch(action.type) {
		case 'SAVE_DOC_START':
			if (state.indexOf(action.payload.doc._id) !== -1) {
				return state
			}
			return [...state, action.payload.doc._id]
		case 'LOAD_DOCS':
			var ids = [];
			action.payload.docs.forEach(function(doc) {
				if (state.indexOf(doc._id) === -1) {
					ids.push(doc._id);
				}
			});
			
			return [...state, ...ids]
		default:
			return state
	}
}

export default ids;