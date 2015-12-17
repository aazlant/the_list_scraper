import Hapi from 'hapi';
import asyncHandler from 'hapi-async-handler';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.load();

const server = new Hapi.Server(); // 8080 is the port to listen
server.connection({port: process.env.APISERVER_PORT});
server.register([ asyncHandler ]);

server.route(routes);

server.start( ()=> {
    console.log(`----\n==> 🌎  API is running on at: ${server.info.uri}`);
});
