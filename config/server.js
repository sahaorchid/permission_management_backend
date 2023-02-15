const Hapi = require('@hapi/hapi');
const host = "localhost";
const server = Hapi.server({
    port: process.env.PORT,
    host: host,
    routes: {
        cors: true,
        // validate: {
        //     failAction: async (req, res, err) => {
        //         return err
        //     }
        // }
    }
});

module.exports = server;