const Joi = require('joi');

const Module = require('../../controllers/Module/index')

const router = [
    {
        path: '/module/fetch/{module_id}',
        method: 'get',
        options: {
            handler: Module.fetchModule,
            description: 'Fetch module details by id',
            tags: ['api', 'module'],
            validate: {
                params: Joi.object({
                    module_id: Joi.number().integer().required()
                })
            }
        }
    },
    {
        path: '/module/fetch-for-user/{user_id}',
        method: 'get',
        options: {
            handler: Module.fetchModuleByUserId,
            description: 'Fetch module by user id',
            tags: ['api', 'module'],
            validate: {
                params: Joi.object({
                    user_id: Joi.number().integer().required()
                })
            }
        }
    },
    {
        path: '/module/add',
        method: 'post',
        options:{
            handler: Module.add,
            description: 'add Module Values',
            tags: ['api','module'],
            validate:{
                payload: Joi.object({
                    name: Joi.string().required(),	
                })
            }
        }
    },
    {
        path: '/module/fetch',
        method: 'get',
        options:{
            handler: Module.fetch,
            description: 'get Module Values',
            tags: ['api','module'],
        }
    },
    {
        path: '/module/edit',
        method: 'post',
        options:{
            handler: Module.edit,
            description: 'edit Module Values',
            tags: ['api','module'],
            validate:{
                payload: Joi.object({
                    id: Joi.number().integer().required(),	
                    name: Joi.string().required(),
                })
            }
        }
    },
    {
        path: '/module/delete',
        method: 'post',
        options:{
            handler: Module.remove,
            description: 'edit Module Values',
            tags: ['api','module'],
            validate:{
                payload: Joi.object({
                    id: Joi.number().integer().required(),	
                })
            }
        }
    },
]

module.exports = router