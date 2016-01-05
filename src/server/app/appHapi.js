// #TODO: rip out express and replace with Hapi, testing
import Hapi from 'hapi';
import inert from 'inert';
import webpack from 'webpack';
import webpackPlugin from 'hapi-webpack-plugin';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

const config = require('../config');

const server = new Hapi.Server();
server.connection({port: config.appPort});

const compiler = webpack(webpackConfig);
const assets = webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath });
const hot = webpackHotMiddleware(compiler);

server.register([{
    register: webpackPlugin,
    options: {compiler, assets, hot},
},
{
    register: inert,
}],
error => {
    if (error) {
        return console.error(error);
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: __dirname + '/index.html',
    },
});

export default server;
