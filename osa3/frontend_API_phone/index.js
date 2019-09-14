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

let persons = [
    {
        id:0,
        name: "Pekka Koodari",
        number: "040123123123"
    },
    {
        id:1,
        name: "Pekka Frontti",
        number: "040123123143"
    },
    {
        id:2,
        name: "Petteri Bäkkäri",
        number: "04012312312312"
    },
    {
        id:3,
        name: "Pentti Webbisivu",
        number: "04012312312314"
    }
]


app.get('/', (req, resp) =>{
    resp.status(404).end()
})

app.get('/api/persons', (req, resp)=>{
    
    /*Info.find({}).then(items => {
        resp.send(items.map(item => item.toJSON()))

    })*/
    resp.send(persons)
})

app.get('/info', (req, resp) =>{

    /*Info.find({}).then(items => {
        console.log(items)
        console.log(items.length)
        const text = new Date()
        const num = items.length

        const template = `<p>Phonebook has info for ${num} people</p><p>${text}</p>`

        resp.send(template)

    })*/

    console.log(persons)
    console.log(persons.length)
    const text = new Date()
    const num = persons.length

    const template = `<p>Phonebook has info for ${num} people</p><p>${text}</p>`

    resp.send(template)

    
})

app.get('/api/persons/:id', (req, resp) => {

    const id = req.params.id
    const ar = persons.filter(item => {
        if(item.id === Number(id)){
            return item
        }
    })

    if(ar.length>0){
        console.log(ar)
        resp.send(ar)
    }else{
        resp.status(404).end("Not found")
    }
  
})

app.delete('/api/persons/:id', (req, resp) =>{

    const id = req.params.id
    console.log(id)
    persons = persons.filter(item => {
        if(item.id !== Number(id)){
            console.log(item)
            return item
        }
    })

    console.log(persons)
    resp.json(persons)
})

app.put('/api/persons/:id', (req,resp) => {
    const upNum = req.body.num
    const id = req.params.id

    console.log("request: ", upNum)

    if(req.body){
        persons = persons.map(item => item.id === Number(id) ? {...item, number: upNum} : item)
        resp.send(persons)
    }else{
        resp.status(500).end('Body missing')
    }
   
    
})

app.post('/api/persons', (req, resp) => {

    const reqBody = req.body

    console.log(reqBody)

    const value = persons.find(item => {
        console.log(typeof item.name)
        console.log(typeof reqBody.name)

        return item.name === reqBody.name
    })

    console.log(value)

    console.log("requestbody", reqBody)

    if(reqBody){

        console.log("helloo")

        if(reqBody.name && reqBody.num && !value){

            console.log("hleoooo")

            const obj = {
                id: Math.floor(Math.random()*10000) + 1,
                name: reqBody.name,
                number: reqBody.num
            }

            morgan.token()

            persons = persons.concat(obj)

            resp.send(obj)

        }else{
            resp.status(500).end("Name, number is missing. Also the person can already be added in the phonebook")
        }

    }else{
        resp.send('hoohohoh')
    }
})
/*
const port = 3001

app.listen(port)

console.log(`Listening on port ${port}`)
*/


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

