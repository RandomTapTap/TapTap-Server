const routes = require('express').Router()
const Controller = require('../controller/ControllerPlayer')

routes.post('/addPlayer',Controller.addplayer)
routes.post('/join',Controller.JoinRoom)
routes.post('/leave',Controller.leaveRoom)
routes.delete('/delete/player',Controller.delete)

module.exports = routes