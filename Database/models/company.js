let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let companySchema = new Schema({
    name: { type: String, required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true},
    email: { type: String },
    phone: { type: String },
    address: { type: String }
});
let Company = mongoose.model('Company', companySchema);

module.exports = (registry) => {
    registry['Company'] = Company;
};