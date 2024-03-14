'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      grade.hasMany(models.Enseignant);
    }
  }

  grade.findAllGrade = async () => {
    try {
      const grades = await models.grade.findAll();
      return grades;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des Grades');
    }
  };
  grade.init({
    acronyme: DataTypes.STRING,
    designation_grade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'grade',
  });
  return grade;
};