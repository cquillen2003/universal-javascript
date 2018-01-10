function docs(state, action) {
	switch(action.type) {
		case 'SAVE_DOC_START':
		case 'SAVE_DOC_SUCCESS':
			return { ...state, [action.payload.doc._id]: action.payload.doc }
		case 'LOAD_DOCS':
			var docs = {};
			action.payload.docs.forEach(function(doc) {
				docs[doc._id] = doc;
			});

			return { ...state, ...docs }
		default:
			return state
	}
}

export default docs;