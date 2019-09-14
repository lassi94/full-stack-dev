require('dotenv').config()
const express = require('express')
const parser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Info = require('./models/item')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req, resp) => JSON.stringify(req.body))

app.use(parser.json())


app.get('/', (req, resp) =>{
    unkown(req, resp)
})

app.get('/api/persons', (req, resp)=>{
    
    Info.find({}).then(items => {
        resp.send(items.map(item => item.toJSON()))

    })
})

app.get('/info', (req, resp) =>{

    Info.find({}).then(items => {
        console.log(items)
        console.log(items.length)
        const text = new Date()
        const num = items.length

        const template = `<p>Phonebook has info for ${num} people</p><p>${text}</p>`

        resp.send(template)

    })
})



app.get('/api/persons/:id', (req, resp, next) => {

    const id = req.params.id

    Info.findById(id).then(item => {
        if(item !== undefined){
            console.log(item)
            resp.json(item)
        }else{
            unkown(req, resp)
        }
    }).catch(error => 
        {
            console.log('Error', error)
            errorMW(error, req, resp, next)
        })
})

app.delete('/api/persons/:id', (req, resp) =>{

    const id = req.params.id

    Info.findByIdAndDelete(id).then(item => {
        if(item){
            resp.status(200).send('Deletion successfull')
        }else{
            unkown(req, resp)
        }
        
    }).catch(error => {
        console.log('Deletion was not successfull')
        errorMW(error, req, resp, next)
    })
})

app.put('/api/persons/:id', (req,resp, next) => {
    const upNum = req.body.num
    const id = req.params.id

    console.log("request: ", upNum)

    if(req.body){
        Info.findByIdAndUpdate(id, {number:upNum}, {new: true}).then(item => {
            console.log('Item updated successfully!')
            console.log("item:", item)
            resp.send(item)
        }).catch(error => queryError(error, req, resp, next))
        
    }else{
        resp.status(500).end('Body missing')
    }
   
    
})

app.post('/api/persons', (req, resp, next) => {
    const body = req.body

    if(body){
        const obj = {
            name: body.name,
            number: body.num
        }
        
        Info.create(obj).then(item => {
            console.log('item created successfully!')
            resp.json(item.toJSON())
        }).catch(error => queryError(error, req, resp, next))
        
     
    }else{
        resp.status(500).end('No body')
    }
    
})

const errorMW = (error, req, resp, next) => {
    console.error(error.message)

    if(error.name === 'CastError'){
        if(error.kind === 'ObjectId'){
            return resp.status(400).send({error:'wrong id'})
        }
    }
    if(error.name === 'ValidationError'){
        return resp.status(400).json({error: error.message})
    }
    next(error)
}

app.use(errorMW)

const unkown = (req, resp) =>{

    resp.status(404).send({error: 'Not found'})

}

app.use(unkown)

const queryError = (error, req, resp, next) =>{
    if(error.name === 'ValidationError'){
        return resp.status(400).json({error: error.message})
    }else{
        resp.status(500).send({error: 'Something went wrong'})
    }
    next(error)
}

app.use(queryError)

/*
const port = 3001

app.listen(port)

console.log(`Listening on port ${port}`)
*/


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

