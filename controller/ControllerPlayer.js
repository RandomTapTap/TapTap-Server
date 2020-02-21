const { Player } = require('../models')

class ControllerPlayer {
    static addplayer (req,res,next){
        let wow = req.body.username
        console.log(wow)
        Player.findOne ({
            where : {
                username : wow
            }
        })
            .then(data => {
                // console.log(username)
                if(!data){
                    return Player.create({
                        username : wow
                    })
                }else{
                    next({
                        message : 'UserName is already'
                    })
                }
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static JoinRoom(req,res,next) {
        const { username } = req.body
        const { roomid } = req.headers
        console.log(req.headers)
        Player.findOne({
            where : {
                username
            }
        })
            .then(data => {
                if(data){
                    return Player.update({
                        RoomId : roomid
                    },
                    {
                        where : {
                            username
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
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static leaveRoom(req,res,next){
        const { username } = req.body
        Player.findOne(
            {
                where: {
                    username
                }
            }
        )
            .then(data => {
                if(data){
                    return Player.update(
                        {
                            RoomId : null
                        },
                        {
                            where: {
                                username
                            }
                        }
                    )
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static delete(req,res,next){
        const { username } = req.body
        Player.destroy(
            {
                where : {
                    username
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

module.exports = ControllerPlayer