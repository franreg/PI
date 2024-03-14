'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enseignant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enseignant.belongsTo(models.grade,{foreignKey:'GradeId'});
      Enseignant.belongsTo(models.grade,{foreignKey:'SpecialisationId'});
    }
  }

  Enseignant.findAllEnseignant = async () => {
    try {
      const enseigant = await Enseignant.findAll();
      return enseigant;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des enseignants');
    }
  };


  Enseignant.init({
    nom_enseignant: DataTypes.STRING,
    prenom_enseignant: DataTypes.STRING,
    dn_enseignant: DataTypes.DATE,
    matricule_enseignant: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    numero: DataTypes.STRING,
    sexe: DataTypes.STRING,
    GradeId: DataTypes.INTEGER,
    SpecialisationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Enseignant',
  });
  return Enseignant;
};