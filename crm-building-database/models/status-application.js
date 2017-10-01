let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let statusApplicationSchema = new Schema({
    name: { type: String}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let StatusApplicationApplication = mongoose.model('StatusApplication', statusApplicationSchema);
module.exports = (registry) => {
    registry['StatusApplication'] = StatusApplication;
}