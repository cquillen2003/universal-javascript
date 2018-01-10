function loaded(state, action) {
	switch(action.type) {
		case 'LOAD_DOCS':
			return true
		default:
			return state
	}
}

export default loaded;