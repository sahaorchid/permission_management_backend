const Joi = require('joi');

const DynamicAttribute = require('../../controllers/DynamicAttribute')

const router = [
    {
        path: '/dynamic-attribute/add',
        method: 'post',
        options:{
            handler: DynamicAttribute.add,
            description: 'add Dynamic Attributes',
            tags: ['api','dynamic-attribute'],
            validate:{
                payload: Joi.object({
                    attribute_name: Joi.string().required(),
                    attribute_type: Joi.string().required(),
                    attribute_value: Joi.string().allow(null),
                    // password: Joi.string().required()
                })
            }
        }
    },
    {
        path: '/dynamic-attribute/fetch-all',
        method: 'get',
        options:{
            handler: DynamicAttribute.fetchAll,
            description: 'Dynamic Attributes fetch',
            tags: ['api','dynamic-attribute']
        }
    }, {
        path: '/dynamic-attribute/fetch-all-fields',
        method: 'get',
        options:{
            handler: DynamicAttribute.fetchAllFields,
            description: 'Dynamic Attributes fetch',
            tags: ['api','dynamic-attribute'],
            validate: {
                query: Joi.object({
                    module_id: Joi.number().required()
                })
            }
        }
    },{
        path: '/dynamic-attribute/add-to-module',
        method: 'post',
        options:{
            handler: DynamicAttribute.addFieldToModule,
            description: 'Dynamic Attributes fetch',
            tags: ['api','dynamic-attribute'],
            validate: {
                payload: Joi.object({
                    module_id: Joi.number().required(),
                    attribute_id: Joi.number().required()
                })
            }
        }
    },
    {
        path: '/dynamic-attribute/fetch/{module_id}',
        method: 'get',
        options:{
            handler: DynamicAttribute.fetch,
            description: 'Dynamic Attributes fetch',
            tags: ['api','dynamic-attribute'],
            validate:{
                params:Joi.object({
                    module_id: Joi.number().required()
                })
            }
        }
    },
    {
        path: '/dynamic-attribute/edit',
        method: 'post',
        options:{
            handler: DynamicAttribute.edit,
            description: 'edit Dynamic Attributes',
            tags: ['api','dynamic-attribute'],
            auth: false,
            validate:{
                payload: Joi.object({
                    id: Joi.number().integer().required(),
                    attribute_name: Joi.string().allow(null),
                    attribute_type: Joi.string().allow(null),
                    attribute_value: Joi.string().allow(null),	
                })
            }
        }
    },
    {
        path: '/dynamic-attribute/delete',
        method: 'post',
        options:{
            handler: DynamicAttribute.remove,
            description: 'delete Dynamic Attributes',
            tags: ['api','dynamic-attribute'],
            auth: false,
            validate:{
                payload: Joi.object({
                    id: Joi.number().integer().required(),
                    sure: Joi.string().allow(null)
                })
            }
        }
    },
    {
        path: '/dynamic-attribute/get/{id}',
        method: 'get',
        options:{
            handler: DynamicAttribute.getById,
            description: 'get Dynamic user Attributes',
            tags: ['api','dynamic-attribute'],
            validate:{
                params:Joi.object({
                    id: Joi.number().required()
                })
            }
        }
    },
]

module.exports = router