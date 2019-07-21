const path = require('path')

module.exports = (env, arg) => {
  console.log('ENV', env)
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
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
      contentBase: '/public'
    }
  }
}
