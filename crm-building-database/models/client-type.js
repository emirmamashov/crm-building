let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let clientTypeSchema = new Schema({
    name: { type: String }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let ClientType = mongoose.model('ClientType', clientTypeSchema);
module.exports = (registry) => {
    registry['ClientType'] = ClientType;
}