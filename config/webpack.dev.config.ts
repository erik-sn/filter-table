/* tslint:disable:no-var-requires object-literal-sort-keys */
import * as autoprefixer from 'autoprefixer';
import * as path from 'path';
import * as webpack from 'webpack';


const configuration: webpack.Configuration = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './config/index.tsx',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../src'),
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.tsx$/,
        include: [path.join(__dirname, '../src'), path.join(__dirname, '../config')],
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.ts$/,
        include: [path.join(__dirname, '../src'), path.join(__dirname, '../config')],
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.json', '.', '.js', '.jsx'],  // the js extensions are necessary for webpack
  },
};

export default configuration;
