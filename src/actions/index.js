import uuid from 'uuid/v4';
import axios from 'axios';

//Add new doc to redux store
export function newDoc(docType, doc) {
	return {
		type: 'NEW_DOC',
		payload: { docType: docType, doc: doc }
	}
}

//Create new doc and add to redux store
function createDocStart(docType, doc) {
	return {
		type: 'CREATE_DOC_START',
		payload: { docType: docType, doc: doc }
	}
}

function createDocSuccess(docType, doc) {
	return {
		type: 'CREATE_DOC_SUCCESS',
		payload: { docType: docType, doc: doc }
	}
}

export function createDoc(docType, doc) {
	//Add doc id
	if (!doc._id) {
		doc._id = uuid();
	}

	//Add time stamp
	var timeNow = new Date().toISOString();
	doc.created_at = timeNow;
	doc.updated_at = timeNow;

	return async function(dispatch, getState) {
		dispatch(createDocStart(docType, doc));
		try {
			//Use CouchDB
			//var res = await couch.db.put(doc);
			//doc._rev = res.rev;

			//Use MongoDB (This only works client-side)
			var res = await axios.post('/documents', doc);
			dispatch(createDocSuccess(docType, doc));
		}
		catch (error) {
			console.log(error);
		}
	}
}

//Update doc and update redux store
export function updateDocStart(docType, doc) {
	return {
		type: 'UPDATE_DOC_START',
		payload: { docType: docType, doc: doc }
	}
}

export function updateDocSuccess(docType, doc) {
	return {
		type: 'UPDATE_DOC_SUCCESS',
		payload: { docType: docType, doc: doc }
	}
}

export function updateDoc(docType, doc) {
	//Add time stamp
	var timeNow = new Date().toISOString();
	doc.updated_at = timeNow;

	return async function(dispatch, getState) {
		dispatch(updateDocStart(docType, doc));
		try {
			//Use CouchDB
			//var res = await couch.db.put(doc);
			//doc._rev = res.rev;

			//Use MongoDB
			var res = await axios.put('/documents', doc);
			dispatch(updateDocSuccess(docType, doc));
		}
		catch (error) {
			console.log(error);
		}
	}
}


//Fetch all docs of specified type and add to redux store
function requestDocs(docType) {
	return {
		type: 'REQUEST_DOCS',
		payload: { docType: docType }
	}
}

export function loadDocs(docType, docs) {
	return {
		type: 'LOAD_DOCS',
		payload: { docType: docType, docs: docs }
	}
}

export function fetchDocs(docType) {
	return async function(dispatch, getState) {
		dispatch(requestDocs(docType));
		try {
			//Use CouchDB
			//Default limit is 25!  Confirmed in CouchDB docs.
			//var res = await couch.db.find({ selector: { type: docType }, limit: 10000 });
			//dispatch(loadDocs(docType, res.docs));
			
			//Use MongoDB
			var res = await axios.get('/documents');
			dispatch(loadDocs(docType, res.data.docs));
		}
		catch (error) {
			console.log(error);
		}
	}
}