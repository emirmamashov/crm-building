let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let positionOperationSchema = new Schema({
    operationId: { type: Schema.Types.ObjectId, ref: 'Operation'},
    positionId: { type: Schema.Types.ObjectId, ref: 'Position'},
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

let PositionOperation = mongoose.model('PositionOperation', positionOperationSchema);

module.exports = (registry) => {
    registry['PositionOperation'] = PositionOperation;
};