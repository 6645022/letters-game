"use strict";
const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      app = express(),
      mongoose = require('mongoose');

import routes  from './routes';
import config  from './config/config';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// **** database ****
let configInst = new config();
mongoose.connect(configInst.db);

// **** routes ****
new routes(app);

app.use((req, res, next) => {
    let err= {
      status : 404,
      message : 'Not Found'
  };
    next(err);
});

app.use((err, req, res, next) => {
    err.status =  err.status || 500
  res.status(err.status || 500).json({status:err.status ,message : err.message || 'Error'})
});

module.exports = app;
