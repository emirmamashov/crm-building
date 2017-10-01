let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PromoStickerShema = new Schema({
    name: { type: String, required: true },
    image: { type: String }
});

let PromoSticker = mongoose.model('PromoSticker', PromoStickerShema);

module.exports = (registry) => {
    registry['PromoSticker'] = PromoSticker;
}