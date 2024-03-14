'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filiere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Filiere.findAllFiliere= async()=>{
    try{
      const filiere = await Filiere.findAll();
      return filiere;
    }catch(error){
      throw new Error('Erreur lors de la récupération des filières');
    }
  }

  Filiere.init({
    acrofil: DataTypes.STRING,
    description: DataTypes.STRING,
    niveau: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Filiere',
  });
  return Filiere;
};