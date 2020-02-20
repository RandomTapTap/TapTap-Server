const express = require('express')
const app = express()
const http = require('http').createServer(app)
const oi = require('socket.io')(http)


http.listen(3000,() => {
    console.log('let go tap tap')
})