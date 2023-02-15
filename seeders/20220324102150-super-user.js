'use strict';
const User = require('../models').users;
const { hashPassword } =require('../service/password');

module.exports = {
  async up (queryInterface, Sequelize) {

    let hased_password = await hashPassword('crm1234')
    
    await User.create({
      id: 1,
      name: 'crmadmin',
      email: 'admin@crm.com',
      password: hased_password,
      role: 'super',
      permission: 'All'
    })
  },
 

  async down (queryInterface, Sequelize) {
    await User.destroy({truncate: { cascade: true }})
  }
};
