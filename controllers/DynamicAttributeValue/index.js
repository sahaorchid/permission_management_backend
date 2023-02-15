const {
    dynamic_attribute,
    dynamic_attributes_value,
    modules,
    module_dynamic_attribute,
    module_permission,
    users
} = require('../../models')
const { success, error } = require('../../response/macros')
const { Op } = require("sequelize");

const addDynamicValue = async (req, res) => {
    try {
        const { attribute_id = null, value = null } = req.payload
        const available = await dynamic_attributes_value.findOne({
            where: {
                attribute_id
            }
        })
        if (available) {
            if (available.value == value) {
                return success({operation: false}, 'No changes are made.')(res);
            } else if (available.value != value && value) {
                await dynamic_attributes_value.update({
                    value
                }, {
                    where: {
                        attribute_id
                    }
                })
                return success({operation: true}, 'Field value updated successfully.')(res);
            } else if (available.value != value && !value) {
                await dynamic_attributes_value.destroy({
                    where: {
                        attribute_id
                    }
                })
                return success({operation: false}, 'Field value deleted successfully.')(res);
            } 
        } else {
            await dynamic_attributes_value.create({
                attribute_id,
                value
            })
            return success({operation: true}, 'Field value added succcessfully.')(res);
        }
    } catch (error) {
        return success({operation: false}, 'Field value not added succcessfully.')(res);
    }
}



module.exports = {
    addDynamicValue
}