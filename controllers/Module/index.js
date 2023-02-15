const { success, error } = require('../../response/macros')
const { Op } = require("sequelize");
const {
    dynamic_attribute,
    dynamic_attributes_value,
    modules,
    module_dynamic_attribute,
    module_permission: ModulePermission,
    users
} = require('../../models')



module.exports = {
    add,
    fetch,
    edit,
    remove,
    fetchModule,
    fetchModuleByUserId
}

async function fetchModuleByUserId(req, res) {
    try {
        const { user_id } = req.params
        const module = await modules.findAll({
            include: [
                {
                    model: ModulePermission,
                    where: {
                        user_id
                    }
                }, {
                    model: module_dynamic_attribute,
                    mapToModel: true,
                    include: [
                        {
                            model: dynamic_attribute
                        }, {
                            model: dynamic_attributes_value
                        }
                    ]
                }
            ],
            mapToModel: true
        })
        return success({fetched: true, module}, 'Module fetched successfully.')(res);
    } catch (error) {
        return success({error, fetched: false}, 'Module not fetched successfully.')(res);
    }
}

async function fetchModule(req, res) {
    try {
        const { module_id } = req.params
        const module = await modules.findOne({
            where: {
                id: module_id
            },
            include: [
                {
                    model: ModulePermission,
                    mapToModel: true,
                    include: [
                        {
                            model: users
                        }
                    ]
                }
            ],
            mapToModel: true
        })
        return success({module,fetched: true}, 'Data fetched successfully.')(res);
    } catch (error) {
        return success({fetched: false}, 'Data not fetched successfully.')(res);
    }
}

async function add(req, res){
    try {
        const rb = req.payload
        await modules.create({
            name: rb.name,
            user_id: req.user.id
        })
        return success({created: true},"Module created successfully.")(res);
    } catch (error) {
        console.log(error)
        return success({created: false},"Module not created. ")(res);
    }
}

async function fetch(req, res) {
    try {
        if (req.user.role == 'SUPER') {
            const data = await modules.findAll({
                where: {
                    user_id: req.user.id
                },
                include: [
                    {
                        model: users,
                        required: true,
                        attributes: ['id', 'name', 'email', 'role']
                    },
                    {
                        model: ModulePermission,
                        include: [
                            {
                                model: users,
                                attributes: ['name']
                            }
                        ]
                    }, {
                        model: module_dynamic_attribute,
                        attributes: ['id']
                    }
                ]
            })
            return success({data},"Successfully fetched module. ")(res);
        } else {
            const data = await ModulePermission.findAll({
                where: {
                    user_id: req.user.id
                },
                include: [
                    {
                        model: users,
                        required: true,
                        attributes: ['id', 'name', 'email', 'role']
                    },
                    {
                        model: modules,
                        include: [
                            {
                                model: dynamic_attribute,
                                include: [
                                    {
                                        model: dynamic_attributes_value
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
            return success({data},"Successfully fetched module. ")(res);
        }
        
    } catch (error) {
        console.log(error);
    }
}
async function edit (req, res) {
    try {
        const rb = req.payload
        await modules.update({
            name: rb.name
        },
        {    
            where: {
                id: rb.id
            }
        })

        return success({updated: true},"Module updated successfully.")(res);
        
    } catch (error) {
        console.log(error)
        return success({updated: false}, 'Module not updated.')(res)
    }
}
async function remove(req, res) {
    const rb = req.payload
    const data = await ModulePermission.findAll({
        where: {
            module_id: rb.id
        }
    })

    if(data.length > 0){
        return success({deleted: false},"Module already assigned.")(res);
    }else{
        await modules.destroy({
            where:{
                id: rb.id
            }
        })
        return success({deleted: true},"Module deleted successfully.")(res);
    }

}