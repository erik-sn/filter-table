/* tslint:disable:no-var-requires object-literal-sort-keys */
import * as autoprefixer from 'autoprefixer';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const configuration: webpack.Configuration = {
  devtool: 'hidden-source-map',
  entry: [
    './src/components/filter_table.tsx',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({
      filename: 'index.css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false,
        },
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          publicPath: '/dist',
        }),
        include: path.join(__dirname, '../src/sass'),
      },
      {
        test: /\.ts$|\.tsx$/,
        use: ['awesome-typescript-loader'],
        include: path.join(__dirname, '../src'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json'],
  },
  externals: {
      react: 'React',
  },
};

export default configuration;
