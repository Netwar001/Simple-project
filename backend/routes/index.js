const express = require('express');
const connection = require("../database/connection");
const router = express.Router();

/* GET home page. */
router.get('/main', async function (req, res, next) {
    await connection.connectToServer(async function (err) {
        if (err)
            console.log(err);
        const db = connection.getDb()
        const collection = db.collection('users')
        const data = await collection.find({username: {$ne: req.session.user.username}},
            {projection: {_id: 1, username: 1, is_verified: 1}}).limit(5).toArray();
        res.json(data);
        db.close
    });
});

module.exports = router;
