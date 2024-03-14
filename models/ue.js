'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UE.hasMany(models.ECUE);
    }
  }

  UE.findAllUE= async()=>{
    try{
      const ue = await UE.findAll();
      return ue;
    }catch(erreur){
      throw new Error('Erreur lors de la récupération des UE');
    }
  }

  UE.init({
    codeue: DataTypes.STRING,
    libelleue: DataTypes.STRING,
    creditue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UE',
  });
  return UE;
};