const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: './widget/widget.js',
  output: {
    filename: './webpack/bundle.js',
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  // externals: {
  //   react: 'window.React',
  //   'react-dom': 'window.ReactDOM',
  // },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  optimization: {
    minimize: true,
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            ecma: 5,
            warnings: false,
            drop_debugger: true,
            drop_console: true,
            // pure_funcs: ["console.log"],
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // splitChunks: {
    //   chunks: 'all', // initial、async和all
    //   minSize: 30000, // 形成一个新代码块最小的体积
    //   minChunks: 2, // 引入两次及以上被打包
    //   automaticNameDelimiter: '.',
    //   cacheGroups: {
    //     ethersproject: {
    //       name: 'ethersproject',
    //       chunks: 'all',
    //       minChunks: 1,
    //       test: /[\\/]node_modules[\\/](@ethersproject)/,
    //       priority: 10,
    //     },
    //   },
    // },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, '../src')],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../widget'),
        ],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)$/,
        include: [path.resolve(__dirname, '../src')],
        exclude: /(node_modules|bower_components)/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/i,
        include: [path.resolve(__dirname, '../src')],
        use: [
          'url-loader',
        ],
      },
    ],
  },
};
