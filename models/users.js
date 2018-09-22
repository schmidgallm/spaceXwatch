// Dependencies
const mongoose = require('mongoose');

// Save ref to schema construcor
const Schema = mongoose.Schema;

// SpaceX Articles Collection
const UsersSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'enter valid email address']
    },

 
})

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
