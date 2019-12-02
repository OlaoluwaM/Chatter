const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: __dirname + '/app',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    './index.js',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    hotOnly: true,
    contentBase: '/dist',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
