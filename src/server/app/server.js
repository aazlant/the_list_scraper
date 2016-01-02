//#TODO: convert to es6, rip out express and replace with Hapi

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var httpProxy = require('http-proxy');
var dotenv = require('dotenv');

var app = new (require('express'))()

dotenv.load();

var port = process.env.APPSERVER_PORT || 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))


var apiHost = process.env.HOST || 'localhost'
var apiPort = process.env.APISERVER_PORT || 8080
// #TODO: Move to config?

var proxy = httpProxy.createProxyServer({
  target: 'http://' + apiHost + ':' + apiPort,
  ws: true
});

app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
