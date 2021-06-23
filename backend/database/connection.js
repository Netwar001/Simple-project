const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const MongoStore = require('connect-mongo');
require('dotenv').config();

const uri = process.env.DB_CONN;
let db;

module.exports = {
    connectToServer: async function (callback) {
        await MongoClient.connect(
            uri,
            {useNewUrlParser: true, useUnifiedTopology: true},
            function (err, client) {
                db = client.db('SimpleProject');
                return callback(err);
            })
    },

    getDb: function () {
        return db;
    },

    session: session({
        name: 'SimpleProjectCookie',
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: uri,
            ttl: 3 * 24 * 60 * 60,
            collectionName: 'sessions',
            autoRemove: "native"
        })
    })
}