const path = require('path');
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|@polymer|@vaadin|@lit)\/).*/,
                options: {
                    configFile: path.resolve('babel.config.js')
                }
            },
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
      optimization: {
        minimizer: [new uglifyjsWebpackPlugin()]
    },
};