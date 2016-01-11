const path = require('path');
const webpack = require('webpack');
const poststylus = require('poststylus');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/client/index',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
        },
        {
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader',
        }],
    },
    stylus: {
        use: [
            poststylus([ 'autoprefixer', 'rucksack-css' ]),
        ],
    },
};
