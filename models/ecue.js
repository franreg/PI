'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ECUE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ECUE.belongsTo(models.UE,{foreignKey:'UEId'})
    }
  }

  ECUE.findAllECUE= async()=>{
    try{
      const ecue = await ECUE.findAll();
      return ecue;
    }catch(erreur){
      throw new Error('Erreur lors de la récupération des UE');
    }
  }

  ECUE.init({
    codeecue: DataTypes.STRING,
    libelleecue: DataTypes.STRING,
    credituecue: DataTypes.DOUBLE,
    UEId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ECUE',
  });
  return ECUE;
};