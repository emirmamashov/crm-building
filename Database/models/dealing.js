let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// Сделки
let dealingSchema = new Schema({
    beginDate: { type: Date },
    number: { type: Number },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    typeWorkId: { type: Schema.Types.ObjectId, ref: 'TypeWork' },
    endDate: { type: Date },
    generalCheck: { type: Number },
    priceMaster: { type: Number },
    profit: { type: Number }, // прибыль
    marja: { type: Number },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    rating: { type: Number },
    comments: { type: String },
    contractId: { type: Schema.Types.ObjectId, ref: 'Contract' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let Dealing = mongoose.model('Dealing', dealingSchema);
module.exports = (registry) => {
    registry['Dealing'] = Dealing;
}