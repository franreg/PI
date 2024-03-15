'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class annee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  annee.findAllAnnee = async () => {
    try {
      const an = await annee.findAll();
      return an;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des enseignants');
    }
  };
  annee.init({
    titre: DataTypes.STRING,
    date_debut: DataTypes.DATE,
    date_fin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'annee',
  });
  return annee;
};