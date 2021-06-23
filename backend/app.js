const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const {session} = require('./database/connection');

const app = express();
const cors = require('cors')
app.use(cors({credentials: true,}),);
app.use(session);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

let staticPath = path.join(__dirname, '../frontend/build');
app.use(express.static(staticPath));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/sessions', indexRouter);
apiRouter.use('/users', usersRouter);

module.exports = app;
