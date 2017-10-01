var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    companyId: {
        type: Schema.Types.ObjectId, ref: 'Company',
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});

module.exports = (registry) => {
    registry['User'] = User;
}