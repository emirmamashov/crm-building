let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let positionSchema = new Schema({
    name: { type: String, required: true }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let Position = mongoose.model('Position', positionSchema);
module.exports = (registry) => {
    registry['Position'] = Position;
}