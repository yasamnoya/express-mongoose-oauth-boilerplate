const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const session = require('./config/session');
const passport = require('./config/passport');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('common'));
}

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

module.exports = app;
