import path from 'path'
import webpack, { Configuration } from 'webpack'
import { IS_DEV, WEBPACK_PORT } from './src/server/config'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import 'webpack-dev-server'

const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const targets = IS_DEV ? { chrome: '79', firefox: '72' } : '> 0.25%, not dead'

const config: Configuration = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : false,
  entry: {
    index: './src/client/client',
  },
  output: {
    filename: `[name].bundle.js`,
    path: path.join(__dirname, 'dist', 'statics'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
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
            plugins: [IS_DEV && require.resolve('react-refresh/babel'), '@emotion'].filter(Boolean),
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
    hot: true,
    open: IS_DEV,
    openPage: `http://localhost:${WEBPACK_PORT}`,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    ...(IS_DEV ? [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()] : []),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HTMLWebpackPlugin({ template: path.resolve('src', 'client', 'index.html') }),
  ].filter(Boolean),
}

export default config
