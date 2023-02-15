'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users', // table name
        'creator_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'creator_id'),
    ]);
  }
};
