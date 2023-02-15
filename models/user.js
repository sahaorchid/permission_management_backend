'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(models.dynamic_attribute,{
        foreignKey: 'user_id'
      });
      models.users.hasMany(models.dynamic_attributes_value,{
        foreignKey: 'user_id'
      });
      models.users.hasMany(models.module_permission, {
        foreignKey: 'user_id'
      });
      models.users.hasMany(models.modules, {
        foreignKey: 'user_id'
      })
    }
  }
  user.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    creator_id: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'users',
  });
  return user;
};