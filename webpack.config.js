const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var BrotliPlugin = require('brotli-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const hashType = isDev ? 'hash' : 'chunkhash';

const generalPlugins = [
  new HtmlWebpackPlugin({ template: './index.html' }),
  new MiniCssExtractPlugin({ filename: `[name].bundle.[${hashType}].css` }),
  new CopyWebpackPlugin([{ from: '../_redirects' }]),
];
const pluginsObj = {
  prod: [
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
  ],
  dev: [new webpack.HotModuleReplacementPlugin(), new BundleAnalyzerPlugin()],
};

const config = {
  context: __dirname + '/app',
  entry: {
    index: ['./index.js', './index.scss'],
  },
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
    filename: `[name].bundle.[${hashType}].js`,
    chunkFilename: `[name].[${hashType}].js`,
    publicPath: '/',
    devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
  },
  devtool: isDev ? 'inline-source-map' : '',
  devServer: {
    historyApiFallback: true,
    open: true,
    hotOnly: true,
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      // Tells splitChunks to create chunks based off some conditions, such as being a vendor.
      cacheGroups: {
        // Each key name represents a chunk, and each key references an obj that holds the configs for that chunk
        vendor: {
          // Condition 1: can be a sync or async module
          chunks: 'all',
          // File path of module must come from the node_modules folder
          test: /node_modules/,
          name: 'vendors',
          /*
            Used to determine where chunks that match numerous cacheGroups will go.
            The group with the larger priority will be win the chunk
          */
          priority: 20,
        },
        common: {
          name: 'common',
          chunks: 'async',
          // Tells webpack to assign a module to this chunk if it is referenced by at least 2 files/modules/chunks.
          minChunks: 2,
          reuseExistingChunk: true,
          // Forces splitChunks plugin to form this chunk irrespective of the size of the chunk
          enforce: true,
          priority: 10,
        },
      },
    },
  },
  mode: isDev ? 'development' : 'production',
};

module.exports = {
  ...config,
  plugins: [
    ...generalPlugins,
    ...[isDev ? pluginsObj.dev : pluginsObj.prod][0],
  ],
};
