var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var CafeNoiDia = require('./model/CafeNoiDia');

router.get('/', function (req, res) {

    CafeNoiDia.find({}, function (err, listGia) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(listGia);
    });
    
});
module.exports = router;