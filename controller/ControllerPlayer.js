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
                return Player.update({
                    RoomId : data.id
                },
                {
                    where : {
                        username
                    }
                })

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
        Player.findOne({
            where : {
                username
            }
        })
            .then(data => {

            })
            .catch(err => {

            })
    }
}

module.exports = ControllerPlayer