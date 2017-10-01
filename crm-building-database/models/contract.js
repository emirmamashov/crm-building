let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let contractSchema = new Schema({
    name: { type: String },
    number: { type: Number }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let Contract = mongoose.model('Contract', contractSchema);
module.exports = (registry) => {
    registry['Contract'] = Contract;
}