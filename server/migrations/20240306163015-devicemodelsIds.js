'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('devices', 'modelId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('devices', 'modelId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
