import Hapi from 'hapi';
import asyncHandler from 'hapi-async-handler';
import * as routes from './routes';
import bell from 'bell';
const config = require('../config');

const server = new Hapi.Server();

// #TODO: error-check, break out auth middleware

server.connection({port: config.apiPort});

server.on('internalError', (request, err)=> {
  console.error(request, err);
});

server.register([ asyncHandler ], ()=>{});
// server.register(bell, (err)=> {
//     if (err) {
//         console.error(err);
//     }

//     // Declare an authentication strategy using the bell scheme
//     // with the name of the provider, cookie encryption password,
//     // and the OAuth client credentials.
//     server.auth.strategy('google', 'bell', {
//         provider: 'google',
//         password: config.secret,
//         clientId: config.googleClientId,
//         clientSecret: config.googleSecret,
//         isSecure: false,     // Terrible idea but required if not using HTTPS especially if developing locally
//     });

//     server.route(routes.googleAuthRoute);
// });

server.route(routes.default);

export default server;
