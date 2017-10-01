let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let sourceFoundSchema = new Schema({
    name: { type: String }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let SourceFound = mongoose.model('SourceFound', sourceFoundSchema);
module.exports = (registry) => {
    registry['SourceFound'] = SourceFound;
}