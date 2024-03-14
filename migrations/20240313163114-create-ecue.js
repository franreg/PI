'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ECUEs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codeecue: {
        type: Sequelize.STRING
      },
      libelleecue: {
        type: Sequelize.STRING
      },
      credituecue: {
        type: Sequelize.DOUBLE
      },
      UEId: {
        type: Sequelize.INTEGER,
        references:{
          model:'UEs',
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
    await queryInterface.dropTable('ECUEs');
  }
};