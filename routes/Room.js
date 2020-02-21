const routes = require('express').Router()
const Controller = require('../controller/Controller')

routes.post('/addRoom',Controller.addRoom)
routes.delete('/delete',Controller.delete)
routes.get('/allRoom',Controller.findAll)
routes.get('/findone',Controller.findOne)

module.exports = routes