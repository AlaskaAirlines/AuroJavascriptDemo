const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const commonConfig = {
  mode: 'production',
  entry: ['./src/index.js'],
  plugins: [new CleanWebpackPlugin(), new CompressionPlugin(), new BundleAnalyzerPlugin(), new HtmlWebpackPlugin({
    inject: "body",
    filename: "index.html",
    template: "src/index_template.html"
  }), new webpack.HashedModuleIdsPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  resolve: {
    modules: ['node_modules']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

const modernConfig = {
  name: "client-modern",
  output: {
    filename: '[name].[contenthash].modern.bundle.js',
    path: path.resolve(__dirname, 'dist', 'modern')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/i,
        use: {
          loader: 'babel-loader',
          options: {
            envName: "modern" // Points to env.modern in babel.config.js
          }
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
  ...commonConfig
};

const legacyConfig = {
  name: "client-legacy",
  output: {
    filename: '[name].[contenthash].legacy.bundle.js',
    path: path.resolve(__dirname, 'dist', 'legacy')
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
          options: {
            envName: "legacy" // Points to env.legacy in babel.config.js
          }
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
  ...commonConfig
};

module.exports = [modernConfig, legacyConfig];