var express = require('express');
var app = express();
var db = require('./db');
// ADD THESE TWO LINES
var CafeNoiDiaController = require('./CafeNoiDiaController');
app.use('/gianoidia', CafeNoiDiaController);
module.exports = app;