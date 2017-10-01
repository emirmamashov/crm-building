let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let exchangeSchema = new Schema({
    usd: { type: Number, default: 49 },
    eur: { type: Number },
    kzt: { type: Number },
    rub: { type: Number }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let Exchange = mongoose.model('Exchange', exchangeSchema);
module.exports = (registry) => {
    registry['Exchange'] = Exchange;
}