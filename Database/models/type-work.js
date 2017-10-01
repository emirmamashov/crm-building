let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let typeWorkShema = new Schema({
    name: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId,  ref: 'Company' },
});

let TypeWork = mongoose.model('TypeWork', typeWorkShema);

module.exports = (registry) => {
    registry['TypeWork'] = TypeWork;
}