const routes = require('express').Router()
const Controller = require('../controller/ControllerPlayer')

routes.post('/addPlayer',Controller.addplayer)

module.exports = routes