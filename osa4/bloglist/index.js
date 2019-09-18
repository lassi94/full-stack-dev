const http = require('http')
const app = require('./app')
const config = require('./utils/config')

const server = http.createServer(app)

const PORT = config.PORT || 3003
server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})