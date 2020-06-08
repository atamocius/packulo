const path = require('path');

module.exports = {
  template: {
    title: '📦💀 Webpack Boilerplate',
    favicon: 'favicon.ico',
  },
  paths: {
    rendererSrc: path.resolve(__dirname, '../src/renderer'), // renderer source files
    build: path.resolve(__dirname, '../dist'), // production build files
    static: path.resolve(__dirname, '../public'), // static files to copy to build folder
  },
};
