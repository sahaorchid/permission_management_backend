'use strict';
require('dotenv').config();
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const { jwtAuthentication } = require('./controllers/auth')
const server = require('./config/server');
const baseRouter = require('./routes');
const Pack = require('./package');


const init = async () => {

    await jwtAuthentication(server);

    const swaggerOptions = {
        documentationPath: '/swagger',
        basePath: '/api',
        info: {
            title: 'CRM API',
            version: Pack.version,
        },
        grouping: 'tags',
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        security: [{ jwt: [] }],
        schemes: ['http', 'https']
    }


    // Adding plugins for swagger docs;
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    await server.register(baseRouter,
        {
            routes: {
                prefix: '/api'
            }
        }
    );

    server.events.on('response', function (request) {
        console.log("request payload: ", request.payload)
        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode);
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();