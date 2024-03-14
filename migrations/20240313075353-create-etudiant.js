'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Etudiants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom_etudiant: {
        type: Sequelize.STRING
      },
      prenom_etudiant: {
        type: Sequelize.STRING
      },
      dn_etudiant: {
        type: Sequelize.DATE
      },
      matricule_etudiant: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      sexe: {
        type: Sequelize.STRING
      },
      filiere: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Etudiants');
  }
};