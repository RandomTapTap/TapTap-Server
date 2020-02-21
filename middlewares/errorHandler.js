module.exports = function(err, req, res, next) {
  console.log(err)
  status = 500
  errObj = {
    msg : "Internal Server Error"
  }

  if (err.message === 'is undefined') {
    status = 400
    errObj = {
      msg : "Bad request",
      error : err.message
    }
  } else if (err.message === 'RoomName is already') {
    status = 400
    errObj = {
      msg : 'Bad request',
      error : err.message
    }
  }
  res.status(500).json(errObj)
}