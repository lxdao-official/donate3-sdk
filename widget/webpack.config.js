const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: './widget/widget.js',
  output: {
    filename: './webpack/bundle.js',
  },

  // devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer")
    }
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: { and: [/\.(js|ts)x?$/] },
        use: ['@svgr/webpack', 'url-loader','svg-inline-loader'],
      }
    ],
  },
};
