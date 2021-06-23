const express = require('express');
const connection = require("../database/connection");
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const nodemailer = require('nodemailer');

router.post('/signup', async (req, res) => {
    try {
        const {username, email, password, host} = req.body;
        await connection.connectToServer(async function (err) {
            if (err)
                console.log(err);
            const db = connection.getDb()
            const collection = db.collection('users')
            if (await collection.findOne({username: username}) !== null)
                res.json("Никнейм занят")
            else if (await collection.findOne({email: email}) !== null)
                res.json("Аккаунт с указанной почтой уже зарегистрирован")
            else {
                let salt = parseInt(process.env.SALT);
                let hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(salt))
                let key = crypto.randomBytes(50).toString('hex');
                const user = {
                    username: username, email: email, password: hashPassword,
                    is_verified: false, verification_key: key
                };
                collection.insertOne(user, function (err) {
                    if (err)
                        console.log(err);
                })
                sendEmail(email, username, host, key);
                res.json("Ссылка для активации аккаунта была отправлена на указанную почту");
            }
            db.close
        });
    } catch (err) {
        res.json("error");
    }
});

function sendEmail(email, username, host, key) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_LOGIN,
            pass: process.env.EMAIL_PASS,
        },
    })
    let link = host + "/verify?email=" + email + "?id=" + key;
    transporter.sendMail({
        from: '"Simple project" <' + process.env.EMAIL_LOGIN + '>',
        to: email,
        subject: 'Ссылка для активации',
        html: '<div><p><b>Письмо для ' + username + '!</b></p> <p>Перейдите по ссылке для активации аккаунта: ' + link + '</p></div>',
    });
}

router.post('/verify', async function (req, res) {
    const {href} = req.body;
    let email = href.split('?email=').pop().split('?id=').shift();
    let key = href.split('?id=').pop();
    await connection.connectToServer(async function (err) {
        if (err)
            console.log(err);
        const db = connection.getDb()
        const collection = db.collection('users')
        if (await collection.findOne({email: email, verification_key: key}) === null)
            res.json("Ссылка недействительна")
        else {
            collection.updateOne({email: email}, {$set: {is_verified: true, verification_key: null}}, function (err) {
                if (err)
                    console.log(err);
            })
            res.json("Аккаунт успешно активирован");
        }
        db.close
    })
});

router.post('/login', async (req, res) => {
    try {
        const {usernameOrEmail, password} = req.body;
        await connection.connectToServer(async function (err) {
            if (err)
                console.log(err);
            const db = connection.getDb()
            const collection = db.collection('users')
            let user = await collection.findOne({
                $or: [{username: usernameOrEmail}, {email: usernameOrEmail}],
            });
            if (user !== null) {
                if (user.is_verified === true && bcrypt.compareSync(password, user.password)) {
                    let sessionUser = {userId: user._id, username: user.username};
                    req.session.user = sessionUser;
                    res.json(sessionUser);
                } else if (user.is_verified === false)
                    res.json("Активируйте аккаунт перейдя по ссылке из письма");
                else
                    res.json("Неверный пароль");
            } else
                res.json("Аккаунта с указанным логином не существует");
            db.close
        });
    } catch (err) {
        res.json(err);
    }
});

router.delete('/logout', ({session}, res) => {
    try {
        const user = session.user;
        if (user) {
            session.destroy((err) => {
                if (err) throw err;
                res.clearCookie('SimpleProjectCookie');
                res.json(user);
            });
        } else {
            res.json('Что-то пошло не так');
        }
    } catch (err) {
        res.json(err);
    }
});

router.get('/loadUser', ({session: {user}}, res) => {
    res.send({user});
});

module.exports = router;
