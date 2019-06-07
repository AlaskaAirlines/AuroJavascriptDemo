const path = require('path');
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', '@webcomponents/template', './src/index.js'],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [new CompressionPlugin(), new BundleAnalyzerPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(lit-html))/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false,
                                    targets: {
                                        ie: 11,
                                    },
                                },
                            ],
                        ]
                    },
                },
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
    resolve: {
        modules: ['node_modules']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};