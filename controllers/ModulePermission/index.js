const { success, error } = require('../../response/macros')
const { Op } = require("sequelize");
const {
    dynamic_attribute,
    dynamic_attributes_value,
    modules: Module,
    module_dynamic_attribute,
    module_permission: ModulePermission,
    users: User
} = require('../../models')



module.exports = {
    add,
    fetch,
    edit,
    remove
}

async function add(req, res){
    try {
        const rb = req.payload
        await ModulePermission.create({
            module_id: rb.module_id,
            user_id: rb.user_id,
            permission: rb.permission
        })
        return success({created: true},"Successfully added module for the user. ")(res);
    } catch (error) {
        console.log(error)
        return success({created: false},"Module not added for the user. ")(res);
    }
}

async function fetch(req, res) {
    try {
        const data = await ModulePermission.findAll({
            include: [
                {
                    model: Module
                },
                {
                    model: User,
                    attributes: ['id', 'name', 'email', 'role']
                }
            ]
        })
        return success({data},"Successfully fetched module. ")(res);
    } catch (error) {
        console.log(error);
    }
}
async function edit (req, res) {
    try {
        const { id, permission } = req.payload
        await ModulePermission.update({
            permission: permission
        },
        {    
            where: {
                id: id
            }
        })

        return success({updated: true},"Module permission updated successfully.")(res);
    } catch (error) {
        console.log(error)
        return success({updated: false},"Module permission not updated. ")(res);
    }
}
async function remove(req, res) {
    try{
        await ModulePermission.destroy({
            where:{
                id: req.payload.id
            }
        })
        return success({deleted: true},"Module successfully removed from the user.")(res);
    }catch(e){
        console.log(e)
        return success({deleted: false},"Module is not removed from the user.")(res);
    }

}