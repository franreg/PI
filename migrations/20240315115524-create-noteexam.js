'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('noteexams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaquetteId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Maquettes',
          key:'id'
        }
      },
      EtudiantId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Etudiants',
          key:'id'
        }
      },
      ECUEId: {
        type: Sequelize.INTEGER,
        references:{
          model:'ECUEs',
          key:'id'
        }
      },
      note: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('noteexams');
  }
};