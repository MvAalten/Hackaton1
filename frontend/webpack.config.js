const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'web/index.js'),
  output: {
    path: path.resolve(__dirname, 'web-dist'),
    filename: 'bundle.js',
  },
  resolve: {
    // .web.* eerst, zodat src/*.web.ts (bv. nfc.web.ts) voorrang krijgt op
    // het platform-specifieke bestand (nfc.ts) dat de echte app gebruikt.
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'web/index.html'),
    }),
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
