const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: [
    'core-js/modules/es.array.iterator', // needed for dynamic import of the web components
    './src/index.js'
  ],
  /* Include hash of file contents in filename for caching purposes and output files to dist directory */
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        /* Transpile JS from source and Web Component packages in ES6 */
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/lit-element"),
          path.resolve(__dirname, "node_modules/lit-html"),
          path.resolve(__dirname, "node_modules/@alaskaairux")
        ],
        use: {
          loader: 'babel-loader'
        },
      },
      {
        /* Process SASS and extract CSS into separate file instead of bundling with JS */
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    /* Cleans the dist folder on build */
    new CleanWebpackPlugin(),
    /* Uncomment to view bundle stats on build */
    //new BundleAnalyzerPlugin(),
    /* Adds generated JS files to HTML */
    new HtmlWebpackPlugin({
      inject: "body",
      filename: "index.html",
      template: "src/index_template.html"
    }),
    /* Copies the webcomponents polyfills to the output directory */
    new CopyPlugin([
      {
        context: 'node_modules/@webcomponents/webcomponentsjs',
        from: '**/*.js',
        to: 'webcomponents',
      }
    ]),
    /* Used to extract CSS into separate file instead of bundling with JS */
    new MiniCssExtractPlugin()
  ],
  /* Optional optimization -- split output into chunks based on npm package name */
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    }
  }
}