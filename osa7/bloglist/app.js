const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const app = express()
const router = require('./controllers/blogs.js')
const user = require('./controllers/users')
const login = require('./controllers/login')
const handler = require('./utils/middleware')

//DB connection

mongoose.connect(config.MONGODB_URI, {useNewUrlParser:true}).then(()=>{
    console.log('Connected!')
}).catch(error => {
    console.log('Cannot connect to DB: ', error)
})

app.use(bodyparser.json())
app.use(cors())

//Routers and middlewares

app.use('/api/users', user)
app.use('/api/login', login)

app.use(handler.getAuth)
app.use('/api/blogs', router)


app.use(handler.webtokenError)
app.use(handler.errorHandler)
app.use(handler.validation)



module.exports = app