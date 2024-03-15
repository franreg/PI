'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class noteexam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      noteexam.belongsTo(models.Maquette,{foreignKey:'MaquetteId'});
      noteexam.belongsTo(models.Etudiant,{foreignKey:'EtudiantId'});
      noteexam.belongsTo(models.ECUE,{foreignKey:'ECUEId'});
    }
    
  }
  noteexam.init({
    MaquetteId: DataTypes.INTEGER,
    EtudiantId: DataTypes.INTEGER,
    ECUEId: DataTypes.INTEGER,
    note: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'noteexam',
  });
  return noteexam;
};