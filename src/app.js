const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('common'));
}

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

module.exports = app;
