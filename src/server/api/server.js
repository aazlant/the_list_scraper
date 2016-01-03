require('babel-register');
const server = require('./api');

server.start( ()=> {
    console.log(`----\n==> 🌎  API is running on at: ${server.info.uri}`);
});
