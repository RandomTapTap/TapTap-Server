const routes = require('express').Router()
const Controller = require('../controller/Controller')

routes.post('/addRoom',Controller.addRoom)
routes.delete('/delete',Controller.delete)

module.exports = routes