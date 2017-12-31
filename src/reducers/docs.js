function docs(state, action) {
	switch(action.type) {
		case 'LOAD_DOCS':
			var docs = {};
			action.payload.docs.forEach(function(doc) {
				docs[doc._id] = doc;
			});

			return { ...state, ...docs };
		default:
			return state;
	}
}

export default docs;