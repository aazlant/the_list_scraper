import Hapi from 'hapi';
import asyncHandler from 'hapi-async-handler';
import routes from './routes';
const config = require('../config');

const server = new Hapi.Server();

// #TODO: error-check

server.connection({port: config.apiPort});
server.register([ asyncHandler ], ()=>{});

server.route(routes);

export default server;
