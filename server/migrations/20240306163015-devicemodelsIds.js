'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('devices', 'modelId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'models', // Ім'я таблиці Model
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('devices', 'modelId');
  }
};
