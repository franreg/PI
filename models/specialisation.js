'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      specialisation.hasMany(models.Enseignant);
    }
  }
  specialisation.init({
    acronyme: DataTypes.STRING,
    designation_specialisation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'specialisation',
  });
  return specialisation;
};