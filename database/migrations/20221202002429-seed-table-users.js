'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync('password', salt)
    queryInterface.bulkInsert('users', [
      {
        id: 1,
        uuid: 'ef2e46b6-b26e-4b00-ae60-52ad2bd96577',
        name: 'Admin',
        email: 'admin@admin.com',
        password: hashPassword,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
  }
};
