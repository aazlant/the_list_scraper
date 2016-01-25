// #TODO: rip out express and replace with Hapi, testing
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import passport from 'passport';

const app = new (require('express'))();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});

// app.post('/login',
//     passport.authenticate('local'), { failureFlash: true }
// );

export default app;
