let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let superUserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
});
let SuperUser = mongoose.model('SuperUser', superUserSchema);
module.exports = (registry) => {
    registry['SuperUser'] = SuperUser;
}