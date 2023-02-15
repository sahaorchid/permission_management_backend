const {
    dynamic_attribute,
    dynamic_attributes_value,
    modules,
    module_dynamic_attribute,
    module_permission,
    users
} = require('../../models')
const { hashPassword, verifyPassword } =require('../../service/password');
const Jwt = require('@hapi/jwt');
const { success, error } = require('../../response/macros')
const { Op } = require("sequelize");

async function login(req, res){
    try {
        const rb = req.payload;

        const user = await users.findOne({
            where:{
                email: rb.email
            },
            attributes: {exclude:['created_at','updated_at']},
        });

        if(!user){
            return success({},'Wrong email')(res);
        }

        let password = user.dataValues.password;

        let checkPassword = await verifyPassword(rb.password, password), token;

        if(checkPassword){

            delete user.dataValues.password

            token = Jwt.token.generate({ 
                expiresIn: 36000,
                aud: 'urn:audience:test',
                iss: 'urn:issuer:test',
                sub: false,
                maxAgeSec: 14400,
                timeSkewSec: 15,
                user: user
            }, 'secret_key');

            return success({AccessToken: token},"Success")(res);
        }else{
            return success({},'Wrong password')(res);
        }
    } catch (error) {
        console.log(error)
    }
}
async function getDetails(req, res) {
    if (req.user.role == 'SUPER') {
        const user = await users.findOne({
            where: {
                id: req.user.id
            },
            // include: [
            //     {
            //         model: modules,
            //         include: [
            //             {
            //                 model: module_permission
            //             },
            //         ]
            //     }
            // ]
        })
        return success({user},'user fetched successfully')(res)
    } else {
        const user = await users.findOne({
            where: {
                id: req.user.id
            },
            include: [
                {
                    model: module_permission,
                    include: [
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
                }
            ]
        })
        return success({user},'user fetched successfully')(res)
    }
}
async function list(req, res) {
    try{
        const user = await users.findAll({
            where:{
                role: {
                    [Op.ne]: 'SUPER',
                },
                creator_id: req.user.id
            },
            attributes: {exclude:['created_at','updated_at','password']},
            // include: [
            //     {
            //         model: module_permission,
            //         include: [
            //             {
            //                 model: modules,
            //                 include: [
            //                     {
            //                         model: dynamic_attribute,
            //                         include: [
            //                             {
            //                                 model: dynamic_attributes_value
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             }
            //         ]
            //     }
            // ],
            order: [
                ['id', 'DESC']
            ],
        });
        return success({user},'user fetched successfully')(res)

    }catch(e){
        console.log(e)
    }
}
async function addSuper(req, res) {
    try {
        const rb = req.payload;
        let hased_password = await hashPassword(rb.password)
        await users.create({
            name: rb.name,
            email: rb.email,
            role: 'SUPER',
            password: hased_password,
            creator_id: 0
        })
        return success({},'user created successfully')(res)
    } catch (error) {
        console.log(error);
    }
}
async function add(req,res){
    try{
        const rb = req.payload;
        let hased_password = await hashPassword(rb.password)
        await users.create({
            name: rb.name,
            email: rb.email,
            role: 'USER',
            password: hased_password,
            creator_id: req.user.id
        })
        return success({created: true},'User added successfully')(res)
    }catch(error){
        console.log(error)
        return success({created: false},'User not added successfully')(res)
    }
}
async function getUser(req, res) {
    try{
        const { id } = req.params
        const user = await users.findAll({
            where:{
                id
            },
            attributes: {exclude:['created_at','updated_at','password']},
        });
        return success({user},'user fetched successfully')(res)

    }catch(e){
        console.log(e)
    }
}



async function getUserModule(req, res) {
    try{
        const { id } = req.params
        const data = await users.findOne({
            where:{
                id,
            },
            include:[
                {
                    model: module_permission,
                    include:[
                        {
                            model: modules
                        }
                    ]
                },
            ],
            attributes: {exclude:['created_at','updated_at','password']},
        });
        return success({data},'user fetched successfully')(res)

    }catch(e){
        console.log(e)
    }
}

async function update(req, res) {
    try {
        const { id, name } = req.payload
        const available = await users.findOne({
            where: {
                id
            }
        })
        console.log(available);
        if (available) {
            await users.update({
                name: name
            }, {
                where: {
                    id
                }
            })
            return success({update: true},'User updated successfully')(res)
        }
        return success({update: false},'User not updated successfully')(res)
    } catch (error) {
        return success({update: false},'User not updated successfully')(res)
    }
}

async function deleteUserById(req, res) {
    try {
        const { id = null, sure = null } = req.payload
        const checkAvailableModules = await module_permission.findAll({
            where: {
                user_id: Number(id)
            },
            raw: true
        })
        if (checkAvailableModules.length > 0) {
            return success({cause: 1, deleted: false},'User has some active modules. User cannot be deleted.')(res)
        } else {
            if (sure == 'YES') {
                await users.destroy({
                    where: {
                        id: id
                    }
                })
                return success({deleted: true},'User deleted successfully.')(res)
            } else {
                return success({cause: 2, deleted: false},'User not deleted successfully.')(res)
            }
        }
    } catch (error) {
        return success({cause: 3, deleted: false, error},'User not deleted successfully.')(res)
    }
}

module.exports = {
    login,
    add,
    getDetails,
    list,
    getUser,
    addSuper,
    getUserModule,
    update,
    deleteUserById
}
