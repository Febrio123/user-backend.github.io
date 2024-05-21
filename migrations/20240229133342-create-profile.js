'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Profile', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          image: {
            type: Sequelize.STRING,
            allowNull: true
          },
          age: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          address: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          gender: {
            type: Sequelize.STRING,
            allowNull: true
          },
          userId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: {
                tableName: 'User'
              },
              key: 'id'
            }
          }
        })
      })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profile');
  }
}