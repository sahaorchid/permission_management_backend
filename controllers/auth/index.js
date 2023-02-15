const Jwt = require('@hapi/jwt');

exports.jwtAuthentication = async (server) =>{
    
    await server.register(Jwt);

    server.auth.strategy('jwt_strategy', 'jwt', {
        keys: 'secret_key',
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {
            
            request.user = artifacts.decoded.payload.user;

            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user }
            };
        }
    });

    server.auth.default('jwt_strategy');

};