export function ids(state, action) {
    switch (action.type) {
        case 'CREATE_DOC_START':
        case 'LOAD_DOC':
            if (state.indexOf(action.payload.doc._id) !== -1) {
                return state;
            }
            return [...state, action.payload.doc._id]
        case 'CREATE_DOCS_START':
        case 'LOAD_DOCS':
            let ids = [];
            action.payload.docs.forEach(function(doc) {
                if (state.indexOf(doc._id) === -1) {
                    ids.push(doc._id);
                }
            });
            return [...state, ...ids];
        default:
            return state
    }
}

export function docs(state, action) {
    switch (action.type) {
        case 'CREATE_DOC_START':
        case 'CREATE_DOC_SUCCESS':        
        case 'UPDATE_DOC_START':
        case 'UPDATE_DOC_SUCCESS':
        case 'LOAD_DOC':
            return { ...state, [action.payload.doc._id]: action.payload.doc }
        case 'CREATE_DOCS_START':
        case 'CREATE_DOCS_SUCCESS':
        case 'UPDATE_DOCS_START':
        case 'UPDATE_DOCS_SUCCESS':
        case 'LOAD_DOCS':
            let docs = {};
            action.payload.docs.forEach(function(doc) {
                docs[doc._id] = doc;
            });

            return { ...state, ...docs }
        default:
            return state
    }
}

export function newDoc(state, action) {
    switch (action.type) {
        case 'NEW_DOC':
            return action.payload.doc
        default:
            return state
    }
}

export function loaded(state, action) {
    switch (action.type) {
        case 'LOAD_DOCS':
            return true
        default:
            return state
    }
}