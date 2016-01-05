require('babel-register');

const httpProxy = require('http-proxy');
const server = require('./appHapi');
const config = require('../config');

// #TODO: Move to separate config?

// Set up a proxy to the API server. #TODO: Check for failure if server isn't up?
const proxy = httpProxy.createProxyServer({
    target: 'http://' + config.apiHost + ':' + config.apiPort,
    ws: true,
});

server.route({method: 'GET', path: '/api/{path*}', handler: (req, res) => {
    proxy.web(req, res);
}});

server.start((error) => {
    if (error) {
        console.error(error);
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', config.appPort, config.appPort);
    }
});
