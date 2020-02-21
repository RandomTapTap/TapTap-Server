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

    // socket.on('fetchPlayers', payload => {
    //     Player.findAll({
    //         where: {
    //             RoomId: 1
    //         }
    //         // include: [{
    //         //     model: Room
    //         // }]
    //     })
    //     .then(data => {
    //         io.emit('getPlayers', data)
    //     })
    //     .catch(err => {
    //         console.log(err, "error client fetchplayer")
    //     })
    // })

    socket.on('fetchRooms', () => {
        Room.findAll()
            .then(data => {
                io.emit('showAllRooms', data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    socket.on('joinRoom', (payload) => {
        let dataClient = {
            username: payload.username,
            idRoom: payload.idRoom
        }
        Player.findOne({
            where : {
                username : dataClient.username
            }
        })
            .then(data => {
                if(data){
                    return Player.update({
                        RoomId : dataClient.idRoom
                    },
                    {
                        where : {
                            username : dataClient.username
                        }
                    },
                    {
                        returning :true
                    }
                    )
                }else{
                    next(
                        {
                        message : "is undefiend"
                        }
                    )
                }
            })
            .then(data => {
                return Player.findAll({
                    where : {
                        RoomId: dataClient.idRoom
                    }
                })
            })
            .then(data => {
                io.emit('allPlayersInRoom', data)
            })
            .catch(err => {
                console.log(err)
            })
    })
    socket.on('linkStart', () => {
        io.emit('linkStarting')
    }),
    socket.on('deleteRoom', roomName => {
        Room.destroy(
            {
                where : {
                    RoomName: roomName
                }
            }
        )
            .then(_ => {
                io.emit('roomDeleted')
            })
            .catch(err => {
                console.log(err)
            })
    })
})

http.listen(4000,() => {
    console.log('connect to 4000')
})