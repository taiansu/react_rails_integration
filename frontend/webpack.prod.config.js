var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: [
      "./src/scripts/main.js"
    ]
  },
  output: {
    path: "../app/assets/javascripts/build",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel?presets[]=es2015,presets[]=react",
        exclude: [ path.resolve(__dirname, "node_modules") ]
      },

      {
        test: /\.scss$/,
        loader: "style!css!sass?outputStyle=expanded"
      },

      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },

      {
        test: /\.html$/,
        loader: "file?name=[path][name].[ext]&context=./src"
      }
    ]
  }
};
