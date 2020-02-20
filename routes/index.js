const routes = require('express').Router()
const room = require('./Room.js')
const player = require('./Player')

routes.use(player)
routes.use(room)

module.exports = routes