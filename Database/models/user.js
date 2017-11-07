var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    first_name: { type: String},
    last_name: { type: String},
    phone: { type: Number},
    address: { type: String },
    email: { type: String},
    username: {type: String, required: true, unique: true, dropDups: true},
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
userSchema.methods.verifyPassword = async (password)=>{
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.cryptPassword = async (user)=>{
  return await User.update({_id: user._id}, {$set: {password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))}});
};
let User = mongoose.model('User', userSchema);
module.exports = (registry) => {
    registry['User'] = User;
}