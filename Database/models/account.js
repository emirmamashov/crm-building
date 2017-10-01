let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let accountSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let Account = mongoose.model('Account', accountSchema);
module.exports = (registry) => {
    registry['Account'] = Account;
}