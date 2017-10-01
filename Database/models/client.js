let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let statusApplicationSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
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