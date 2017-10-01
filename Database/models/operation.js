var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var operattionSchema = new Schema({
    entity_name: { type: String },
    isDelete: { type: Boolean},
    isEdit: { type: Boolean},
    isCreate: { type: Boolean},
    isView: { type: Boolean},
});
let Operation = mongoose.model('Operation', operattionSchema);
module.exports = (registry) => {
    registry['Operation'] = Operation;
}