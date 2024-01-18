const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const isDev = env.mode == 'development';

  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    devtool: isDev ? 'source-map' : false,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
      assetModuleFilename: (pathData) => {
        const filepath = path
          .dirname(pathData.filename)
          .split('/')
          .slice(1)
          .join('/');
        return `${filepath}/[name].[ext]`;
      },
    },
    devServer: isDev
      ? {
          static: {
            directory: path.join(__dirname, 'src'),
          },
          compress: true,
          open: true,
          hot: true,
          port: env.port ?? 3000,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, , 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, , 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
            },
          },
        },
        {
          test: /\.(woff|woff2)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
    ],
  };
};
