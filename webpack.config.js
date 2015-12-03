import webpack from 'webpack'

export default {
  devtool: 'source-map',
  entry: './src/index',
  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'redux': {
      root: 'Redux',
      commonjs: 'redux',
      commonjs2: 'redux',
      amd: 'redux',
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs: 'redux',
      commonjs2: 'redux',
      amd: 'redux',
    },
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    }],
  },
  output: {
    path: 'dist',
    filename: 'unirouter.min.js',
    library: 'unirouter',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false, screw_ie8: true},
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}
