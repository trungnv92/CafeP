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
// Tự động chạy
var cron = require('node-cron');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
cron.schedule('34 14 * * *', function(){
    console.log('running a task every minute');
    request('https://giacaphe.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var json = [];
        $('#gianoidia tr').each(function (i, e) {
            //remove first row
            if(i != 0){
                json.push({
                    ten_thi_truong: $(this).children().first().text(),
                    gia: $(this).children().eq(1).first().text(),
                    thay_doi: $(this).children().eq(2).first().text()
                })
            }
        });
        console.log(JSON.stringify(json));
        // Duyệt list và Insert vào database mongodb 
        for(var item in json){
            new CafeNoiDia(json[item]).save().catch((err)=>{
                console.log(err.message);
            });
        }
    }
    })
});

module.exports = router;