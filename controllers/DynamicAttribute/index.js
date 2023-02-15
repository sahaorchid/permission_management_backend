const DynamicAttribute = require('../../models').dynamic_attribute;
const DynamicAttributeValue = require('../../models').dynamic_attributes_value;
const module_dynamic_attribute = require('../../models').module_dynamic_attribute
const User = require('../../models').users;
const { hashPassword, verifyPassword } =require('../../service/password');
const Jwt = require('@hapi/jwt');
const { success, error } = require('../../response/macros')
const { Op } = require("sequelize");
module.exports = {
    fetchAllFields,
    addFieldToModule,
    add,
    fetch,
    edit,
    fetchAll,
    remove,
    getById,
}

async function addFieldToModule(req, res) {
    try{
        const { module_id, attribute_id } = req.payload
        await module_dynamic_attribute.create({
            module_id,
            attribute_id
        })
        return success({module_id, attribute_id, added: true},"Field added to the module successfully.")(res);
    } catch(error){
        return success({added: false},"Field not added to the module.")(res);
    }
}

async function fetchAllFields(req, res) {
    try {
        const { module_id } = req.query
        const fields = await DynamicAttribute.findAll({
            attributes: ['id', 'attribute_name', 'attribute_type'],
            where: {
                user_id: req.user.id
            },
            include: [
                {
                    model: module_dynamic_attribute,
                    require: false,
                    mapToModel: true
                }
            ],
            mapToModel: true
        })
        const mappedData = fields.map(e => {
            return {
                value: e.id,
                text: `${e.attribute_name} (${e.attribute_type})`,
                disabled: e.module_dynamic_attributes.filter(el => el.module_id == module_id).length > 0
            }
        })
        let responseData = await Promise.all(mappedData)
        responseData.unshift({
            value: null,
            text: 'Select a field.',
            disabled: true
          })
        return success({responseData, fetched: true},"Fields fetched.")(res);
    } catch (error) {
        return success({fetched: false},"Fields not fetched.")(res);
    }
}
async function add(req, res){
    try {
        const { attribute_name,attribute_type, attribute_value } = req.payload
        const user_id = req.user.id
        const duplicate = await DynamicAttribute.findOne({
            where: {
                [Op.and]:[
                    {attribute_name},
                    {attribute_type},
                ]
            }
        })

        if(duplicate){
            return success({},'Dynamic attribute name already exist')(res);
        }else{

            await DynamicAttribute.create({
                attribute_name,
                attribute_type,
                attribute_value,
                user_id,
                visibility: 1
            })
        }

            return success({},'Created successfully')(res);
    } catch (error) {
        console.log(error)
    }
}

async function fetchAll(req, res) {
    try {
        const Availableusers = await User.findAll({
            where: {
                creator_id: req.user.id
            },
            attributes: ['id']
        })
        const users = Availableusers.map(e => {
            if (!users.includes(e.id)) {
                return e.id
            }
        })
        const DynamicAttributes = await DynamicAttribute.findAll({
            where: {
                [Op.or]: [
                    {user_id: req.user.id},
                    {user_id: users}
                ]
            }
        })
        return success({DynamicAttributes},'fetched successfully')(res);
    } catch (error) {
        console.log(error);
    }
}

async function fetch(req, res){
    try {
        const user_id = req.user.id
        const module_id = req.params.module_id

        const data = await DynamicAttribute.findAll({
            where:{
                [Op.and]:[
                    {user_id},
                    {module_id}
                ]
            },
            include: {
                model: DynamicAttributeValue,
                required: false
            }
        })

        return success({data},'fetched successfully')(res);
    } catch (error) {
        console.log(error)
    }
}

async function edit(req, res){
    try {
        const { id, attribute_name, attribute_type, attribute_value} = req.payload

        const duplicate = await DynamicAttribute.findOne({
            where: {
                attribute_name,   
                attribute_type,
                attribute_value
            },
            raw: true
        })
        const duplicate2 = await DynamicAttribute.findOne({
            where: {
                attribute_name,   
                attribute_type,
                attribute_value,
                id
            },
            raw: true
        })
        if(duplicate2){
            return success({},'No changes made.')(res);
        } else if (duplicate && duplicate.id != id) {
            return success({},'Field already available.')(res);
        } else {
            let update = {}
            if (attribute_name) {
                update = {
                    ...update,
                    attribute_name
                }
            }
            if (attribute_type) {
                update = {
                    ...update,
                    attribute_type
                }
            }
            if (attribute_value) {
                update = {
                    ...update,
                    attribute_value
                }
            }
            await DynamicAttribute.update(update,{
                where:{
                    id: id
                }
            })
            return success({},'Updated successfully')(res);
        }
    } catch (error) {
        console.log(error)
    }
}

async function remove(req, res){
    try {
        const { id=null , sure = null } = req.payload
        const available = await DynamicAttributeValue.findAll({
            where: {
                attribute_id: id
            },
            raw: true
        })
        if (available.length == 0) {
            if (sure == 'YES') {
                await DynamicAttribute.destroy({
                    where: {
                        id
                    },
                })
            }
            return success({deleted: true},'Deleted successfully')(res);
        }
        return success({cause: 1, deleted: false},'Already in use.')(res);
        
    } catch (error) {
        console.log(error)
    }
}

async function getById(req, res){
    try{
        const {  id = null, sure = null } = req.params
        const user = await DynamicAttributeValue.findAll({
            where:{
                attribute_id: id
            },
            include:[
                {
                    model:User
                }
            ],
            attributes: {exclude:['created_at','updated_at','password']},
        });
        return success({user},'user fetched successfully')(res)

    }catch(e){
        console.log(e)
    }

}
