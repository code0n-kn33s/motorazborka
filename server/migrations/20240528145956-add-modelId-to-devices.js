'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('devices', 'modelId', {
      type: Sequelize.ARRAY(Sequelize.STRING), // Тут змінено тип даних
      defaultValue: []
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('devices', 'modelId');
  }
};
