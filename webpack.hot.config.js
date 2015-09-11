var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var assign = require('101/assign');
var findIndex = require('101/find-index');

// Insert react-hot as last javascript loader
var hotLoaders = webpackConfig.module.loaders;
var jsLoaderIndex = findIndex(hotLoaders, function(loader) {
    return loader.test.exec('file.js');
});
hotLoaders[jsLoaderIndex].loader = 'react-hot!' + hotLoaders[jsLoaderIndex].loader;

// Let's run API server, and proxy our dev server to it
require('babel/register');
var apiServer = require('./src/server');

module.exports = assign({}, webpackConfig, {
    devServer: {
        publicPath: webpackConfig.output.publicPath,
        contentBase: webpackConfig.output.path,
        port: 5688,
        hot: true,
        inline: true,
        proxy: {
            '*': apiServer.url
        },
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'web/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: hotLoaders
    },
    eslint: {
        quiet: true,
        failOnError: false,
        failOnWarning: false
    }
});
