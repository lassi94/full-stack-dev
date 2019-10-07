const mongoose = require('mongoose')
const uni = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 30,
        unique: true,
        required: true
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 30
    },
    passwordHash: {
        type: String,
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

schema.plugin(uni)

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', schema)

module.exports = User
