'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username : "admin",
        email : "gifarianime@gmail.com",
        password : "$2y$10$9EWdj0BnDJRbstQXK1sifezt4e6jz/6JLmfSqt2pfsBTnq0lv4R/e",
        role : "Admin",
        isActive : true,
        imgProfile : null,
        createdAt: "2023-01-28 07:52:27",
        updatedAt: "2023-01-28 07:52:27"
     }], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};