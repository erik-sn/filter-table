/* tslint:disable:no-var-requires object-literal-sort-keys */
import * as autoprefixer from 'autoprefixer';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const configuration: webpack.Configuration = {
  devtool: 'source-map',
  entry: [
    './config/index.tsx',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.min.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({
      filename: 'bundle.min.css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false,
        },
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
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
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
};

export default configuration;
