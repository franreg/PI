'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maquette extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Maquette.findAllMaquette= async()=>{
    try{
      const maquette = await Maquette.findAll();
      return maquette;
    }catch(erreur){
      throw new Error('Erreur lors de la récupération des UE');
    }
  }

  Maquette.init({
    ddanad: DataTypes.STRING,
    dfanad: DataTypes.STRING,
    Filiereid: DataTypes.INTEGER,
    semestre: DataTypes.STRING,
    UEId1: DataTypes.INTEGER,
    UEId2: DataTypes.INTEGER,
    UEId3: DataTypes.INTEGER,
    UEId4: DataTypes.INTEGER,
    UEId5: DataTypes.INTEGER,
    UEId6: DataTypes.INTEGER,
    UEId7: DataTypes.INTEGER,
    UEId8: DataTypes.INTEGER,
    UEId9: DataTypes.INTEGER,
    UEId10: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Maquette',
  });
  return Maquette;
};