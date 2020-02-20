const express = require('express')
const app = express()
const http = require('http').createServer(app)
const oi = require('socket.io')(http)
const routes = require('./routes')

app.get('/', (req, res) => {
    res.status(200).json({data : 'masuk'})
})
app.use(routes)

app.listen(4000,() => {
    console.log('let go tap tap')
})