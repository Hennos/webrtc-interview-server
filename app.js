const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const loadConnections = require('./src/loadConnections');

const indexRouter = require('./routes/index');
const connectionsRouter = require('./routes/connections');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/connections', loadConnections(app), connectionsRouter);

const credentials = {
  key: fs.readFileSync(path.join(__dirname, '/ssl/key.crt')).toString(),
  cert: fs.readFileSync(path.join(__dirname, '/ssl/cert.crt')).toString(),
};
app.set('credentials', credentials);

module.exports = app;
