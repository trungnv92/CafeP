var mongoose = require('mongoose');
var CafeNoiDiaSchema = new mongoose.Schema({
    ten_thi_truong: String,
    gia: String,
    thay_doi: String
});
var CafeNoiDia = mongoose.model('cafeNoiDia', CafeNoiDiaSchema);
module.exports = CafeNoiDia;