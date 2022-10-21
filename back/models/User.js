const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String, 
        required: true 
    },
    role: {
        type: String,
        default: "user"
    }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);