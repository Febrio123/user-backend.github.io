'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('User', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          username: {
            type: Sequelize.STRING,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          roles_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
              model: {
                tableName: "Roles",
              },
              key: 'id'
            }
          }
        })
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
