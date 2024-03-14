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
      Enseignant.belongsTo(models.grade,{foreignKey:'grade'});
      Enseignant.belongsTo(models.specialisation,{foreignKey:'specialisation'});
    }
  }
  Enseignant.init({
    nom_enseignant: DataTypes.STRING,
    prenom_enseignant: DataTypes.STRING,
    dn_enseignant: DataTypes.DATE,
    matricule_enseignant: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    numero: DataTypes.STRING,
    sexe: DataTypes.STRING,
    grade: DataTypes.STRING,
    specialisation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enseignant',
  });
  return Enseignant;
};