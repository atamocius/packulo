const { paths } = require('./constants');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { spawn } = require('child_process');

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
    before() {
      spawn('electron', ['./src/main/main.js'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
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
