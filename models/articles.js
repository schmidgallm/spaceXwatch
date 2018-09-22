// Dependencies
const mongoose = require('mongoose');

// Save ref to schema construcor
const Schema = mongoose.Schema;

// SpaceX Articles Collection
const ArticlesSchema = new Schema({
    snippet: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    author: {
        type: String
    }
})

const Articles = mongoose.model('articles', ArticlesSchema);

module.exports = Articles;
