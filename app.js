const express = require('express')
const app = express()
const http = require('http').createServer(app)
const oi = require('socket.io')(http)
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler');


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({data : 'masuk'})
})
app.use(routes)

app.use(errorHandler)

app.listen(4000,() => {
    console.log('let go tap tap')
})