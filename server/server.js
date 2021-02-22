const http = require('http')
const port = 3007
const app = require('./app')

const server = http.createServer(app)

server.listen((port), () => {
    console.log('i connect to localhost')
})