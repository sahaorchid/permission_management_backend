'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dynamic_attribute extends Model {
    /**
     * Helper method for defining associations belongsTo.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // console.log(models)
      models.dynamic_attribute.hasMany(models.module_dynamic_attribute, {
        foreignKey: 'attribute_id'
      });
      models.dynamic_attribute.hasMany(models.dynamic_attributes_value,{
        foreignKey: 'attribute_id'
      });
      models.dynamic_attribute.belongsTo(models.users,{
        foreignKey: 'user_id'
      });
      models.dynamic_attribute.belongsTo(models.modules, {
        foreignKey: 'module_id'
      })
    }
  }
  dynamic_attribute.init({
    attribute_name: DataTypes.STRING,
    attribute_type: DataTypes.STRING,
    attribute_value: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    module_id: DataTypes.INTEGER,
    visibility:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dynamic_attribute',
  });
  return dynamic_attribute;
};