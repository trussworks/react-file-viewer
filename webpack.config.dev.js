// Original work Copyright (c) 2017 PlanGrid, Inc.
// Modified work Copyright 2020, Trussworks, Inc.

const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  devtool: 'cheap-module-source-map',
  target: 'web',
  mode: 'development',
  stats: {
    all: true,
  },
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8081/',
      path.resolve(__dirname, './src/app.js'),
    ],
  },
  externals: {
    'pdfjs-dist': 'pdfjs-dist',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      fs: path.resolve(__dirname, 'src/noop.js'),
      https: path.resolve(__dirname, 'src/noop.js'),
    },
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'example_files'),
      'node_modules',
    ],
    fallback: {
      http: require.resolve('stream-http'),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /pdf\.worker\.entry\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            filename: 'pdf.worker.[contenthash].js',
          },
        },
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: [
          /\.wexbim$/,
          /\.jpg$/,
          /\.docx$/,
          /\.csv$/,
          /\.mp4$/,
          /\.xlsx$/,
          /\.doc$/,
          /\.avi$/,
          /\.webm$/,
          /\.mov$/,
          /\.mp3$/,
          /\.rtf$/,
          /\.pdf$/,
          /\.gif$/,
        ],
        loader: 'file-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
  ],
}
