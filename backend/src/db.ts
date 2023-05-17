import * as mysql from 'mysql';
import { CONFIGURATIONS } from './const/index.js';

const db = mysql.createConnection(
    CONFIGURATIONS.DB
);
db.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('db connect')
    }
    })
export default db;