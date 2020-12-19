import express from 'express'
import fetch from 'node-fetch'
import * as config from './config'
import webpackConfig from '../../webpack.config'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'

console.log(`*******************************************`)
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`config: ${JSON.stringify(config, null, 2)}`)
console.log(`*******************************************`)

const app = express()
const compiler = webpack(webpackConfig)

app.set('view engine', 'ejs')

app.get('/search', async (req, res) => {
  const { term } = req.query
  const result = await fetch(`https://itunes.apple.com/search?term=${term}`)

  const json = await result.json()

  res.json({ status: 'ok', json }).end()
})

if (config.IS_DEV && webpackConfig.output) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/',
    }),
  )
}

app.listen(config.SERVER_PORT, () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`)
})
