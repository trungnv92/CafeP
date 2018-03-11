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
// Gia cafe
// Tự động chạy mỗi giờ
var cron = require('node-cron');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
cron.schedule('* * * * * *', function(){
    console.log('running a task every minute');
    request('https://giacaphe.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var json = [];
        $('#gianoidia tr').each(function (i, e) {
            //xóa hàng đầu tiên
            if(i != 0){
                json.push({
                    ten_thi_truong: $(this).children().first().text(),
                    gia: $(this).children().eq(1).first().text(),
                    thay_doi: $(this).children().eq(2).first().text()
                })
                
            }
        });
        console.log(JSON.stringify(json));
        // Cap nhat vao database
        // Update 
        for(var item in json){
            var newItem = json[item];
            var conditions = {'ten_thi_truong': newItem.ten_thi_truong};
            //console.log("ITEM: " + newItem +"---");
            var options = {upsert: true};
            CafeNoiDia.update(conditions, newItem, options, 
                function(err, doc){
                    if(err){
                        console.log("Something wrong when updating data! "+err);
                    }
                    console.log(doc);
                });
        }
    }
    })
});

// Gia ho tieu
cron.schedule('00 15 * * * *', function(){
    console.log('running a task every minute');
    request('https://giacaphe.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var json = [];
        $('#gianoidia tr').each(function (i, e) {
            //xóa hàng đầu tiên
            if(i != 0){
                json.push({
                    ten_thi_truong: $(this).children().first().text(),
                    gia: $(this).children().eq(1).first().text(),
                    thay_doi: $(this).children().eq(2).first().text()
                })
                
            }
        });
        console.log(JSON.stringify(json));
        // Cap nhat vao database
        // Update 
        for(var item in json){
            var newItem = json[item];
            var conditions = {'ten_thi_truong': newItem.ten_thi_truong};
            //console.log("ITEM: " + newItem +"---");
            var options = {upsert: true};
            CafeNoiDia.update(conditions, newItem, options, 
                function(err, doc){
                    if(err){
                        console.log("Something wrong when updating data! "+err);
                    }
                    console.log(doc);
                });
        }
    }
    })
});

module.exports = router;