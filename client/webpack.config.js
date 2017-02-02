var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        host:'10.129.11.249',
        port: 4000,
        historyApiFallback: true
    },
    devtool: 'inline-source-map',  //null
    entry: './dev/js/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    output: {
        path: 'src',
        filename: 'js/bundle.min.js'
    },
    plugins: [
        //new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // })
    ]
};
