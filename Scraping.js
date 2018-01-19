var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var db = require('./db');
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

        // Tao moi 
        for(var GiaNoiDiaItem in json){
            new GiaNoiDia(json[GiaNoiDiaItem]).save().catch((err)=>{
                console.log(err.message);
            });
        }

        // Update 

        // var update  = {"ten_thi_truong":"Cà phê London (05/18)","gia":"2000","thay_doi":"+32(1.8%)"};
        // var options = {upsert: true};
        // GiaNoiDia.findOneAndUpdate(update.ten_thi_truong, update, options, (err)=> {console.log("ERROR: " + err)});
        // for(var GiaNoiDiaItem in json){
        //     var conditions = GiaNoiDiaItem.ten_thi_truong;
        //     var update =GiaNoiDiaItem;
        //     var options = {upsert: false};
        //     GiaNoiDia.findOneAndUpdate(conditions, update, options, (err)=> {console.log("ERROR: " + err)});
        // }
    }
})