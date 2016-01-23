var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/app.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.[hash].js'
    },
    module: {
        loaders: [
            {
                test: /node_modules\/auth0-lock\/.*\.js$/,
                loaders: [
                    'transform-loader/cacheable?brfs',
                    'transform-loader/cacheable?packageify'
                ]
            },
            {
                test: /node_modules\/auth0-lock\/.*\.ejs$/,
                loader: 'transform-loader/cacheable?ejsify'
            }, 
            {
              test: /\.json$/,
              loader: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader!eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'autoprefixer-loader?browsers=last 2 version',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=assets/images/[hash:base58:8].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },

            {
                test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=assets/fonts/[name].[ext]'
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'web/index.html',
            favicon: 'web/favicon.ico'
        }),
        new webpack.optimize.UglifyJsPlugin({
            'mangle': false,
            'compress': {
                /* eslint-disable camelcase */
                dead_code: false,  // discard unreachable code
                unsafe: false, // some unsafe optimizations (see below)
                unused: false, // drop unused variables/functions
                hoist_vars: false, // hoist variable declarations
                side_effects: false, // drop side-effect-free statements
                global_defs: {} // glob
                /* eslint-enable camelcase */
            }
        }),
        new webpack.NoErrorsPlugin()

    ]
};
