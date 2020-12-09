const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    classe : {
        type: String
    },
    role: {
        type: String,
        default: 'student'
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;