const { paths } = require('./constants');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: false,
    compress: true,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 1234,
    stats: 'errors-only',
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
