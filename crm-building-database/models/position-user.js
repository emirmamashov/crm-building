var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var positionUserschema = new Schema({
    positionId: { type: Schema.Types.ObjectId, ref: 'Position' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
let PositionUser = mongoose.model('PositionUser', positionUserschema);
module.exports = (registry) => {
    registry['PositionUser'] = PositionUser;
};