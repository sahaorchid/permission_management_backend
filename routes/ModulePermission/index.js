const Joi = require('joi');

const ModulePermission = require('../../controllers/ModulePermission')

const router = [
    {
        path: '/module-permission/add',
        method: 'post',
        options:{
            handler: ModulePermission.add,
            description: 'add Module permission Values',
            tags: ['api','module-permission'],
            validate:{
                payload: Joi.object({
                    module_id: Joi.number().integer().required(),
                    user_id: Joi.number().integer().required(),
                    permission: Joi.string().required()	
                })
            }
        }
    },
    {
        path: '/module-permission/fetch',
        method: 'get',
        options:{
            handler: ModulePermission.fetch,
            description: 'get Module permission Values',
            tags: ['api','module-permission'],
        }
    },
    {
        path: '/module-permission/edit',
        method: 'post',
        options:{
            handler: ModulePermission.edit,
            description: 'edit Module Values',
            tags: ['api','module'],
            validate:{
                payload: Joi.object({
                    id: Joi.number().integer().required(),
                    permission: Joi.string().required()	
                })
            }
        }
    },
    {
        path: '/module-permission/delete',
        method: 'post',
        options:{
            handler: ModulePermission.remove,
            description: 'edit Module permission Values',
            tags: ['api','module-permission'],
            validate:{
                payload: Joi.object({
                    id: Joi.number().integer().required(),	
                })
            }
        }
    },
]

module.exports = router