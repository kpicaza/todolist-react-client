var webpack = require('webpack');

module.exports = {
    entry: './index.js',

    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {},
        extensions: ['', '.jsx', '.js']
    },

    output: {
        path: 'public',
        filename: 'bundle.js',
        publicPath: ''
    },
    // add this handful of plugins that optimize the build
    // when we're in production
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

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", 'react']
                },
            },
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules',
                include: /flexboxgrid/,
            },
            {
                test: /\.css$/,
                loader: "style!css",
                exclude: /flexboxgrid/, // so we have to exclude it
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"],
                exclude: /flexboxgrid/, // so we have to exclude it
            },
            {
                test: /\.(png|gif|jpe?g|svg?(\?v=[0-9]\.[0-9]\.[0-9])?)$/i,
                loader: 'url?limit=10000',
            }
        ]
    }
};
