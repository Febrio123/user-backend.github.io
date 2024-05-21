'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [
      {
        username: "user",
        email: "riskifirmansyah12@gmail.com",
        password: "riski123",
      }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {})
  }
};
