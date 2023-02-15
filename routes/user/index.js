const Joi = require('joi');

const User = require('../../controllers/user')

const router = [
    {
        path: '/user/login',
        method: 'post',
        options:{
            handler: User.login,
            description: 'Employee login',
            tags: ['api','user'],
            auth: false,
            validate:{
                payload: Joi.object({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    },{
        path: '/user/register',
        method: 'post',
        options:{
            handler: User.addSuper,
            description: 'Add User',
            tags: ['api','user'],
            validate:{
                payload: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                })
            }
        }
    }, {
        path: '/user/update',
        method: 'post',
        options:{
            handler: User.update,
            description: 'Add User',
            tags: ['api','user'],
            validate:{
                payload: Joi.object({
                    id: Joi.number().integer().required(),
                    name: Joi.string().required()
                })
            }
        }
    }, {
        path: '/user/delete',
        method: 'post',
        options:{
            handler: User.deleteUserById,
            description: 'Delete User',
            tags: ['api','user'],
            validate:{
                payload: Joi.object({
                    id: Joi.number().integer().required(),
                    sure: Joi.string().allow(null)
                })
            }
        }
    }, {
        path: '/user/add',
        method: 'post',
        options:{
            handler: User.add,
            description: 'Add User',
            tags: ['api','user'],
            validate:{
                payload: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                })
            }
        }
    }, {
        path: '/user/get-details',
        method: 'get',
        options:{
            handler: User.getDetails,
            description: 'get User',
            tags: ['api','user'],
        }
    },
    {
        path: '/user/list',
        method: 'get',
        options:{
            handler: User.list,
            description: 'get User',
            tags: ['api','user'],
        }
    },
    {
        path: '/user/get/{id}',
        method: 'get',
        options:{
            handler: User.getUser,
            description: 'get User',
            tags: ['api','user'],
            validate:{
                params:Joi.object({
                    id: Joi.number().required()
                })
            }
        }
    },
    {
        path: '/user/get-modules/{id}',
        method: 'get',
        options:{
            handler: User.getUserModule,
            description: 'get User module',
            tags: ['api','user'],
            validate:{
                params:Joi.object({
                    id: Joi.number().required()
                })
            }
        }
    },
]

module.exports = router