const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    cache: true,
    context: path.resolve(__dirname, '.'),
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'app-bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [
              'babel-loader',
            ],
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ]
          },
          {
            test: /\.(woff|woff(2))$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 100000
                }
              }
            ]
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  disable: true
                },
              },
            ],
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: 'template.html'
            }
        )
    ],
    devServer: {
        contentBase: path.join(__dirname, '.'),
        compress: true,
        port: 3005,
        hot: true
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            parallel: true,
            sourceMap: true
        })],
    }
  }