'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class module_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.module_permission.belongsTo(models.users, {
        foreignKey: 'user_id'
      });
      models.module_permission.belongsTo(models.modules, {
        foreignKey: 'module_id'
      });

    }
  }
  module_permission.init({
    module_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    permission: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'module_permission',
  });
  return module_permission;
};