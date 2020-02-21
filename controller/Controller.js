const { Room, Player } = require('../models')

class ControllerRoom {
    static addRoom (req,res,next) {
        const { username } = req.headers
        const { RoomName } = req.body
        console.log(req.body)
        let roomData
        Room.findOne(
            {
                where : {
                    RoomName
                }
            }
        )
            .then(data => {
                if(!data){
                    return Room.create({
                        RoomName,
                        RoomMaster : username
                    })
                }else{
                    next({
                        message : "RoomName is already"
                    })
                }
            })
            .then(data => {
                roomData = data
                console.log(data.id)
                return Player.update({
                    RoomId : data.id
                },{
                    where : {
                        username
                    },
                    returning : true
                })
            })
            .then(data => {
                res.status(201).json(roomData)
            })
            .catch(err => {
                next(err)
            })
    }
    static delete (req,res,next){
        const { idRoom } = req.headers
        Room.destroy(
            {
                where : {
                    id : idRoom
                }
            }
        )
            .then(_ => {
                res.status(200).json({
                    message : 'Yeaay'
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static findAll (req,res,next){
        Room.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static findOne(req,res,next){
        const { RoomName } = req.headers
        Room.findOne(
            {
                where : {
                    RoomName
                }
            }
        )
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerRoom