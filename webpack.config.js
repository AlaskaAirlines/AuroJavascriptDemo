const path = require('path');
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader' 
            }
        ]
    },
    resolve: {
        modules: ['node_modules']
      }
};