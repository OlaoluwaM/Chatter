const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  const { NODE_ENV } = env;

  return {
    context: __dirname + '/app',
    entry: ['babel-polyfill', './index.js'],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: 'file-loader',
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/',
      devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
    },
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      open: true,
      hotOnly: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({ template: './index.html' }),
      new MiniCssExtractPlugin({ filename: 'bundle.css' }),
      new CopyWebpackPlugin([{ from: '../_redirects' }]),
    ],
    mode: NODE_ENV === 'production' ? 'production' : 'development',
  };
};
