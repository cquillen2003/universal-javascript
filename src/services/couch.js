import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

class Couch {

	constructor() {
		PouchDB.plugin(PouchDBFind)
		this.db = null;
	}

	create(url) {
		console.log('Couch.create()...', url);
		this.db = new PouchDB(url);
	}

}

console.log('An instance of Couch was created!!!!!!');
var couch = new Couch();

export default couch;