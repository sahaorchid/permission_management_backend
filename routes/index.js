const user = require('./user')
const dynamic_attribute = require('./DynamicAttribute')
const dynamic_attribute_value = require('./DynamicAttributeValue')
const modules = require('./Module')
const module_permission = require('./ModulePermission')
module.exports = {
	name:'base-route',
	version:'1.0.0',
    register:(server,options)=>{
        server.route(user);
		server.route(dynamic_attribute);
		server.route(dynamic_attribute_value);
		server.route(modules),
		server.route(module_permission)
	}
}