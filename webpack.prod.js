const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const {CleanWebpackPlugin} = require ('clean-webpack-plugin')
const WorkboxPlguin = require('workbox-webpack-plugin');

module.exports = {
    entry: '.src/client/index.js',
    mode: 'production',
    prodServer: 8083,
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000' 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: ".src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlguin.GenerateSW(),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true, 
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ]
}