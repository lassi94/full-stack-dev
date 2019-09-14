const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('********************')
    console.log('Remember password and other arguments')
    console.log('Format: node <filename> <password> <name> <number> <operation')
    console.log('Operations: save or get-all')
    console.log('example command: node mongo.js <your-password> Pekka 123123123 save')
    console.log('********************')
}
else{
    const pass = process.argv[2]

    const url = `mongodb+srv://db-user:${pass}@fullstackdev-qufsp.mongodb.net/phonebook?retryWrites=true&w=majority`
    
    mongoose.connect(url, {useNewUrlParser: true})
    
    const schema = new mongoose.Schema({
        name: String,
        number: String
    })
    
    const Info = mongoose.model('Info', schema)

    const item = new Info({
        name: process.argv[3],
        number: process.argv[4]
    })

    if(process.argv[5] == 'save'){
        item.save().then(resp => {
            console.log(`${process.argv[3]} with number ${process.argv[4]} saved!`)
            mongoose.connection.close()
        })
    }else{
        Info.find({}).then(response => {
            response.forEach(item => {
                console.log(item)
            })
            mongoose.connection.close()
        })
        
    }
   


}



