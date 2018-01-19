var express = require('express');
var app = express();
var db = require('./db');
// ADD THESE TWO LINES
var CafeNoiDiaController = require('./CafeNoiDiaController');
app.use('/cafenoidia', CafeNoiDiaController);
module.exports = app;