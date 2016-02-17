require('babel-register');

const httpProxy = require('http-proxy');
const server = require('./app').default;
const appRoute = require('./app').appRoute;
const config = require('../config');

// Set up a proxy to the API server. #TODO: Check for failure if server isn't up? Functional testing... eventually.
const proxy = httpProxy.createProxyServer({
    target: 'http://' + config.apiHost + ':' + config.apiPort,
    ws: true,
});

server.use('/api', (req, res) => {
    proxy.web(req, res);
});

// #TODO: better error-handling for when api server fails (https://github.com/nodejitsu/node-http-proxy/issues/527)

server.get('*', appRoute);


server.listen(config.appPort, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', config.appPort, config.appPort);
    }
});
