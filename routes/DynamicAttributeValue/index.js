const Joi = require('joi');

const DynamicAttributeValue = require('../../controllers/DynamicAttributeValue')

const router = [
    {
        path: '/field-value/add',
        method: 'post',
        options:{
            handler: DynamicAttributeValue.addDynamicValue,
            description: 'add Dynamic Attributes Values',
            tags: ['api','field-value'],
            validate:{
                payload: Joi.object({
                    attribute_id: Joi.number().integer().required(),
                    value: Joi.string().allow(null)
                })
            }
        }
    }
]

module.exports = router