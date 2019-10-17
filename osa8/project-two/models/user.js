const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    favoriteGenre: {
        type: String
    }
})

const model = mongoose.model('User', schema)

module.exports = model