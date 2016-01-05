const path = require('path');
const webpack = require('webpack');

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
        }],
    },
};
