'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.modules.hasMany(models.module_dynamic_attribute, {
        foreignKey: 'module_id'
      });
      models.modules.hasMany(models.module_permission, {
        foreignKey: 'module_id'
      });
      models.modules.belongsTo(models.users, {
        foreignKey: 'user_id'
      });
      models.modules.hasMany(models.dynamic_attribute, {
        foreignKey: 'module_id'
      })
    }
  }
  module.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'modules',
  });
  return module;
};