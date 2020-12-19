import path from 'path'
import { Configuration } from 'webpack'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import { SERVER_PORT, IS_DEV, WEBPACK_PORT } from './src/server/config'

const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const targets = IS_DEV ? { chrome: '79', firefox: '72' } : '> 0.25%, not dead'

const config: Configuration = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : false,
  entry: {
    index: './src/client/client',
  },
  output: {
    path: path.join(__dirname, 'dist', 'statics'),
    filename: `[name]-[hash:8]-bundle.js`,
    chunkFilename: '[name]-[hash:8]-bundle.js',
    publicPath: '/statics/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  optimization: {
    minimize: !IS_DEV,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, nodeModulesPath],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', { modules: false, targets }], '@babel/react', '@babel/typescript'],
            plugins: [],
          },
        },
      },
      {
        test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
        use: 'url-loader?limit=10000',
      },
    ],
  },
  devServer: {
    port: WEBPACK_PORT,
    overlay: IS_DEV,
    open: IS_DEV,
    openPage: `http://localhost:${SERVER_PORT}`,
  },
  plugins: [new WebpackManifestPlugin()],
}

export default config
