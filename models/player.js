'use strict';
module.exports = (sequelize, DataTypes) => {
  class Player extends sequelize.Sequelize.Model{
    static associate (models){
      Player.belongsTo(models.Room)
    }
  }

  Player.init({
    username : {
      type : DataTypes.STRING,
      allowNull:false,
      validate : { 
        notNull: {
          args : true,
          msg : 'Please insert Name for the battle'
        }
      }
    },
    RoomId  :{
      type : DataTypes.INTEGER,
    }
  },{sequelize})
  // const Player = sequelize.define('Player', {
  //   Username: DataTypes.STRING,
  //   RoomId: DataTypes.INTEGER
  // }, {});
  // Player.associate = function(models) {
  //   // associations can be defined here
  // };
  return Player;
};