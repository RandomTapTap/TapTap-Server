'use strict';
module.exports = (sequelize, DataTypes) => {
  class Room extends sequelize.Sequelize.Model{
    static associate (models){
      Room.hasMany(models.Player)
    }
  }

  Room.init({
    RoomName : {
      type : DataTypes.STRING,
      allowNull : false,
      validate :{ 
        notNull : {
          args : true,
          message : "Please insert Name of Room"
        }
      }
    },
    RoomMaster : {
      type : DataTypes.STRING
    }
  },{sequelize})
  return Room;
};