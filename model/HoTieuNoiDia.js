var mongoose = require('mongoose');
var HoTieuNoiDiaSchema = new mongoose.Schema({
    ten_thi_truong: String,
    gia: String,
    thay_doi: String
});
var HoTieuNoiDia = mongoose.model('HotieuNoiDia', HoTieuNoiDiaSchema);
module.exports = HoTieuNoiDia;