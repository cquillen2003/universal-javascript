import uuid from 'uuid/v4';
import couch from '../services/couch';
import axios from 'axios';

function saveDocStart(docType, doc) {
	return {
		type: 'SAVE_DOC_START',
		payload: { docType: docType, doc: doc }
	}
}

function saveDocSuccess(docType, doc) {
	return {
		type: 'SAVE_DOC_SUCCESS',
		payload: { docType: docType, doc: doc }
	}
}

export function saveDoc(docType, doc) {
	//Get db instance
	var db = couch.db;

	//Add doc id
	if (!doc._id) {
		doc._id = uuid();
	}

	//Add time stamp
	var now = new Date().toISOString();
	if (!doc.created_at) {
		doc.created_at = now;
	}
	doc.updated_at = now;

	return async function(dispatch, getState) {
		dispatch(saveDocStart(docType, doc));
		var res = await db.put(doc);
		doc._rev = res.rev;
		dispatch(saveDocSuccess(docType, doc));
	}
}

function loadDocs(docType, docs) {
	return {
		type: 'LOAD_DOCS',
		payload: { docType: docType, docs: docs }
	}
}

export function fetchDocs(docType) {
	return async function(dispatch, getState) {
		//Use CouchDB
		//var db = couch.db;
		//var res = await db.find({ selector: { type: docType }});
		//dispatch(loadDocs(docType, res.docs));
		
		//Use MongoDB (This only works client-side)
		var res = await axios.get('/documents');
		dispatch(loadDocs(docType, res.data.docs));
	}
}