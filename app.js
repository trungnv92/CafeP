var express = require('express');
var app = express();
var db = require('./db');
// ADD THESE TWO LINES
var CafeNoiDiaController = require('./CafeNoiDiaController');
var HoTieuNoiDiaController = require('./HoTieuNoiDiaController');

//app.use('/giacaphe', CafeNoiDiaController);
app.use('/giahotieu', HoTieuNoiDiaController);
module.exports = app;