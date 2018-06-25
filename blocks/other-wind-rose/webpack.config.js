const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.argv[2] === '--production';
const config = {
  entry: './demo/entry.js',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    host: '127.0.0.1',
    contentBase: './dist',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Bizcharts template',
      template: './demo/index.html',
    }),
  ],
};


if (isProd) {
  config.mode = 'production';
  delete config.devtool;
}

module.exports = config;
