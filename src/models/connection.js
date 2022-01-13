const { MongoClient } = require('mongodb');
// esse require do dotenv peguei de uma thread que o nato explicou sobre: https://trybecourse.slack.com/archives/C01T2C18DSM/p1637263538475000
require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
        .then((conn) => {
            db = conn.db(DB_NAME);
            return db;
        }));

module.exports = { connection };
