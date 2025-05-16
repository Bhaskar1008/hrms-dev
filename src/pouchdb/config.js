import PouchDB from 'pouchdb'
const db = new PouchDB(window.location.hostname);
export default db;