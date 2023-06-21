/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
  entry: [path.resolve(__dirname, 'src', 'index'), './src/css/index.scss'],
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/i, loader: 'ts-loader' },
      { test: /\.scss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.png|jpeg|jpg|svg$/i, use: ['file-loader', 'url-loader'], type: 'asset' },
      { test: /\.html$/i, use: 'html-loader' },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    clean: true,
  },
  plugins: [
    new ESLintPlugin({ extensions: ['.ts'], fix: true }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
    new MiniCssExtractPlugin({ filename: 'index.css' }),
  ],
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  // eslint-disable-next-line global-require
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
