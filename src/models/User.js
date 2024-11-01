const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    created_at: { type: Date, default: Date.now }, 
    updated_at: { type: Date, default: Date.now } 
});


UserSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});


module.exports = mongoose.model('User', UserSchema);