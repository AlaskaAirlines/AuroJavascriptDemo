const path = require('path');
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: ['./src/index.js'],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [new CompressionPlugin(), new BundleAnalyzerPlugin()],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    // list all locations that need to be babelized for browser support
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "node_modules/lit-element"),
                    path.resolve(__dirname, "node_modules/lit-html"),
                    path.resolve(__dirname, "node_modules/@alaskaairux/ods-button")
                  ],
                use: {
                    loader: 'babel-loader',
                    options: {presets: [
                        [
                          '@babel/preset-env',
                          {
                            useBuiltIns: 'usage', // automatically import polyfills when needed based on "unsupported" feature usage
                            corejs: '3.0.0',
                            targets: {
                              chrome: '70',
                              edge: '40',
                              safari: '9',
                              ie: '10',
                              firefox: '63',
                              ios: '9',
                              android: '4',
                            },
                          },
                        ],
                        // include other presets here (e.g. @babel/preset-react)
                      ],
                      plugins: [
                        '@babel/plugin-proposal-class-properties', // optional, but nice for making JS classes look *more* like Java or C# classes
                        '@babel/plugin-transform-spread', // support ES6 spread operators in older browsers (e.g. [ ...subset1, ...subset2 ])
                        [
                          '@babel/plugin-proposal-object-rest-spread', // support ES6 object spread operators in older browsers (e.g. { ...object1, ...object2 })
                          {
                            useBuiltIns: true,
                          },
                        ],
                        '@babel/plugin-transform-template-literals', // suport ES6 string template literals in older browsers (e.g. `Hello, ${nameVariable}!`)
                      ],
                      env: {
                        test: {
                          plugins: [
                            '@babel/plugin-transform-modules-commonjs' // transform `import x from 'y'` syntax to `const x = require('y')` in test environment
                            ],
                        },
                      }}
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