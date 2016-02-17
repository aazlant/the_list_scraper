import Hapi from 'hapi';
import asyncHandler from 'hapi-async-handler';
import * as routes from './routes';
const config = require('../config');

const server = new Hapi.Server();

// #TODO: error-check, break out auth middleware

server.connection({port: config.apiPort});

server.on('internalError', (request, err)=> {
  console.error(request, err);
});

server.register([ asyncHandler ], ()=>{});

server.route(routes.default);

export default server;
