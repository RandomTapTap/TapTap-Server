const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors')
const { Player, Room } = require('./models')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(routes)

app.use(errorHandler)

io.on('connection', (socket) => {
    console.log('connect')
    socket.on('addPlayer', payload => {
        Player.findOne ({
            where : {
                username : payload.username
            }
        })
            .then(data => {
                if(!data){
                    return Player.create({
                        username : payload.username
                    })
                }else{
                    console.log({
                        message : 'UserName is already'
                    })
                }
            })
            .then(data => {
                socket.emit('playerAdded', data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    socket.on('createdRoom', payload => {
        let dataClient = {
            RoomName: payload.RoomName,
            username: payload.username
        }

        let roomData

        Room.findOne(
            {
                where : {
                    RoomName : dataClient.RoomName
                }
            }
        )
            .then(data => {
                if(!data){
                    return Room.create({
                        RoomName : dataClient.RoomName,
                        RoomMaster : dataClient.username
                    })
                }else{
                    console.log({
                        message : "RoomName is already"
                    })
                }
            })
            .then(data => {
                roomData = data
                return Player.update({
                    RoomId : data.id
                },{
                    where : {
                        username: dataClient.username
                    },
                    returning : true
                })
            })
            .then(data => {
                socket.emit('AddRoomMaster', roomData)
            })
            .catch(err => {
                console.log(err)
            })
    })

    socket.on('fetchPlayers', payload => {
        Player.findAll({
            where: {
                RoomId: 1
            }
            // include: [{
            //     model: Room
            // }]
        })
        .then(data => {
            let player = data[0].dataValues
            console.log(player)
            io.emit('getPlayers', player)
        })
        .catch(err => {
            console.log(err, "error client fetchplayer")
        })
    })

    socket.on('fetchRooms', () => {
        Room.findAll()
            .then(data => {
                io.emit('showAllRooms', data)
            })
            .catch(err => {
                console.log(err)
            })
    })
})

http.listen(4000,() => {
    console.log('connect to 4000')
})