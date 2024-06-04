module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('models', 'yearId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'years', // Имя таблицы YearModel
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('models', 'yearId');
  }
};
