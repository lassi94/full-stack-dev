const mongoose = require('mongoose')

const URL = process.env.MONGODB_URI

mongoose.connect(URL, {useNewUrlParser:true}).then(result =>{
    console.log('Connected!')
}
).catch(error => console.log('Could not connect to DB! :('))

const schema = new mongoose.Schema({
    name: String,
    number: String
})

schema.set('toJSON', {
    transform: (document, returnObj) => {
        returnObj.id = returnObj._id.toString()
        delete returnObj._id
        delete returnObj.__v
    }
})

const Info = mongoose.model('Info', schema)

module.exports = Info