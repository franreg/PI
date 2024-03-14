'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agent.findAllAgent = async () => {
    try {
      const agents = await Agent.findAll();
      return agents;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des agents');
    }
  };
  Agent.init({
    nom_agent: DataTypes.STRING,
    prenom_agent: DataTypes.STRING,
    dn_agent: DataTypes.DATE,
    matricule_agent: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    numero: DataTypes.STRING,
    sexe: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agent',
  });
  return Agent;
};