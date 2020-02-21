const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler');


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({data : 'masuk'})
})
app.use(routes)

app.use(errorHandler)

io.on('connection', (socket) => {
    console.log('connect')
    
})

http.listen(4000,() => {
    console.log('connect to 4000')
})