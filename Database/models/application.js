let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let applicationSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'Client'},
    endDate: { type: Date },
    beginDate: { type: Date },
    comments: { type: String },
    statusClient: { type: String },
    nextStep: { type: String },
    sourceFoundId: { type: Schema.Types.ObjectId, ref: 'SourceFound' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: Schema.Types.ObjectId, ref: 'StatusApplication' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let Application = mongoose.model('Application', applicationSchema);
module.exports = (registry) => {
    registry['Application'] = Application;
}