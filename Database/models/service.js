let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let serviceSchema = new Schema({
    name: { type: String }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let Service = mongoose.model('Service', serviceSchema);
module.exports = (registry) => {
    registry['Service'] = Service;
}