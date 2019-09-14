const mongoose = require('mongoose')
const uniqueVali = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const URL = process.env.MONGODB_URI

console.log(URL)

mongoose.connect(URL, {useNewUrlParser:true}).then(result =>{
    console.log('Connected!')
}
).catch(error => console.log('Could not connect to DB! :(', error))

const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        unique: true,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
})

schema.plugin(uniqueVali)

schema.set('toJSON', {
    transform: (document, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})

const Info = mongoose.model('Info', schema)

module.exports = Info