const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    // role: {
    //     type:
    // },
    date: {
        type: Date,
        default: Date.now
    }    
});

module.exports = mongoose.connection.useDb('Users_Data').model('User', userSchema, "users");