function ids(state, action) {
	switch(action.type) {
		case 'LOAD_DOCS':
			var ids = [];
			action.payload.docs.forEach(function(doc) {
				if (state.indexOf(doc._id) === -1) {
					ids.push(doc._id);
				}
			});
			
			return [...state, ...ids];
		default:
			return state;
	}
}

export default ids;