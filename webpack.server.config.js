var webpack = require('webpack');
require("babel-polyfill");
var fs = require('fs');
var path = require('path');


module.exports = {

    entry: [
        'babel-polyfill',
        path.resolve(__dirname, 'server.js'),
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {},
        extensions: ['', '.jsx', '.js']
    },

    output: {
        filename: 'server.bundle.js'
    },

    target: 'node',

    // keep node_module paths out of the bundle
    externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
        'react-dom/server', 'react/addons',
    ]).reduce(function (ext, mod) {
        ext[mod] = 'commonjs ' + mod;
        return ext;
    }, {}),

    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            _: "lodash"
        })
    ] : [
        new webpack.ProvidePlugin({
            _: "lodash"
        })
    ],


    node: {
        __filename: true,
        __dirname: true
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", 'react', "stage-0"]
                }
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(png|gif|jpe?g|svg?(\?v=[0-9]\.[0-9]\.[0-9])?)$/i,
                loader: 'url?limit=10000'
            }
        ]
    }

};
