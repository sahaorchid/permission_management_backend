'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dynamic_attributes_value extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // console.log(models)
      // models.dynamic_attributes_value.belongsTo(models.module_dynamic_attribute, {
      //   targetKey: 'id'
      // });
      models.dynamic_attributes_value.belongsTo(models.users,{
        foreignKey: 'user_id'
      });
    }
  }
  dynamic_attributes_value.init({
    value: DataTypes.STRING,
    attribute_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dynamic_attributes_value',
  });
  return dynamic_attributes_value;
};