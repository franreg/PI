'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enseignants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom_enseignant: {
        type: Sequelize.STRING
      },
      prenom_enseignant: {
        type: Sequelize.STRING
      },
      dn_enseignant: {
        type: Sequelize.DATE
      },
      matricule_enseignant: {
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
      GradeId: {
        type: Sequelize.INTEGER,
        references:{
          model:'grades',
          key:'id'
        }
      },
      SpecialisationId: {
        type: Sequelize.INTEGER,
        references:{
          model:'specialisations',
          key:'id'
        }
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
    await queryInterface.dropTable('Enseignants');
  }
};