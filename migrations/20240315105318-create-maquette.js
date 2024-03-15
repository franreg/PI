'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Maquettes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AnneeId: {
        type: Sequelize.INTEGER,
        references:{
          model:'annees',
          key: 'id'
        }
      },
      FiliereId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Filieres',
          key:'id'
        }
      },
      semestre: {
        type: Sequelize.STRING
      },
      UEId1: {
        type: Sequelize.INTEGER
      },
      UEId2: {
        type: Sequelize.INTEGER
      },
      UEId3: {
        type: Sequelize.INTEGER
      },
      UEId4: {
        type: Sequelize.INTEGER
      },
      UEId5: {
        type: Sequelize.INTEGER
      },
      UEId6: {
        type: Sequelize.INTEGER
      },
      UEId7: {
        type: Sequelize.INTEGER
      },
      UEId8: {
        type: Sequelize.INTEGER
      },
      UEId9: {
        type: Sequelize.INTEGER
      },
      UEId10: {
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
    await queryInterface.dropTable('Maquettes');
  }
};