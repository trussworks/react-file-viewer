// Original work Copyright (c) 2017 PlanGrid, Inc.
// Modified work Copyright 2020, Trussworks, Inc.

const path = require('path')

const BUILD_DIR = path.resolve(__dirname, './dist')
const APP_DIR = path.resolve(__dirname, './src')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const config = {
  entry: `${APP_DIR}/components`,
  mode: 'production',
  target: 'web',
  output: {
    path: BUILD_DIR,
    filename: 'index.js',
    library: ['FileViewer'],
    libraryTarget: 'umd',
    publicPath: '/static/react-file-viewer/',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.mjs'],
  },
  plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'disabled' })],
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    { 'pdfjs-dist': 'pdfjs-dist' },
  ],
  module: {
    rules: [
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
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
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
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // if file <=10kb
        },
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
}

module.exports = config
