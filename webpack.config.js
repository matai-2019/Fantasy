const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, arg) => {
  return {
    entry: './client/index.js',
    output: {
      publicPath: '/',
      path: path.join(__dirname, '/build'),
      filename: 'bundle.js'
    },
    mode: env ? 'production' : 'development',
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }]
    },
    plugins: [
      new CopyPlugin([
        { from: 'public' }
      ])
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
      contentBase: '/public'
    },
    node: {
      fs: 'empty'
    }
  }
}
