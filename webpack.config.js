const path = require('path');


module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|@polymer|@vaadin|@lit)\/).*/,
            options: {
                configFile: path.resolve('babel.config.js')
            },
        }]
    },
};