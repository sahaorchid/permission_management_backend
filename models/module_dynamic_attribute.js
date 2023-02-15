'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class module_dynamic_attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.module_dynamic_attribute.belongsTo(models.modules, {
        foreignKey: 'module_id'
      });
      models.module_dynamic_attribute.hasOne(models.dynamic_attributes_value, {
        foreignKey: 'attribute_id'
      })
      models.module_dynamic_attribute.belongsTo(models.dynamic_attribute, {
        foreignKey: 'attribute_id'
      });
    }
  }
  module_dynamic_attribute.init({
    module_id: DataTypes.INTEGER,
    attribute_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'module_dynamic_attribute',
  });
  return module_dynamic_attribute;
};