const { template, paths } = require('./constants');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ResolveShortPathPlugin = require('webpack-resolve-short-path-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [paths.src + '/index.js'],

  context: paths.src,

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    plugins: [new ResolveShortPathPlugin({ rootPath: paths.src })],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: paths.static,
        to: 'static',
        ignore: ['*.DS_Store', 'index.html', 'favicon.+(ico|png|gif)'],
      },
    ]),
    new HtmlWebpackPlugin({
      favicon: paths.static + '/' + template.favicon,
      template: paths.static + '/index.html',
      templateParameters: template,
      filename: 'index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
        },
      },
    ],
  },
};
