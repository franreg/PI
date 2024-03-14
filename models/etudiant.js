'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etudiant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Etudiant.init({
    nom_etudiant: DataTypes.STRING,
    prenom_etudiant: DataTypes.STRING,
    dn_etudiant: DataTypes.DATE,
    matricule_etudiant: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    numero: DataTypes.STRING,
    sexe: DataTypes.STRING,
    filiere: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Etudiant',
  });
  return Etudiant;
};