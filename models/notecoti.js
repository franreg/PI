'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notecoti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notecoti.belongsTo(models.Maquette,{foreignKey:'MaquetteId'});
      notecoti.belongsTo(models.Etudiant,{foreignKey:'EtudiantId'});
      notecoti.belongsTo(models.ECUE,{foreignKey:'ECUEId'});
    }
  }
  notecoti.init({
    MaquetteId: DataTypes.INTEGER,
    EtudiantId: DataTypes.INTEGER,
    ECUEId: DataTypes.INTEGER,
    note: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'notecoti',
  });
  return notecoti;
};