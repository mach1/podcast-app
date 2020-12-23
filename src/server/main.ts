import express from 'express'
import fetch from 'node-fetch'
import * as config from './config'
import webpackConfig from '../../webpack.config'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import xml2js from 'xml2js'
import { RawFeedResponse, ApiFeedResponse } from '../types'

console.log(`*******************************************`)
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`config: ${JSON.stringify(config, null, 2)}`)
console.log(`*******************************************`)

const app = express()
const compiler = webpack(webpackConfig)

app.set('view engine', 'ejs')

app.get('/search', async (req, res) => {
  const result = await fetch(`https://itunes.apple.com/search?term=${req.query.term}&media=${req.query.media}`)

  const json = await result.json()

  res.json({ status: 'ok', json }).end()
})

app.get('/feed', async function (req, res) {
  if (!req.query || !req.query.feedUrl) {
    res.status(400).send('No feedUrl provided')
    return
  }

  const url = req.query.feedUrl.toString()
  const response = await fetch(url)
  const text = await response.text()
  const parser = new xml2js.Parser()
  const feed: RawFeedResponse = await parser.parseStringPromise(text)

  const feedChannel = feed.rss.channel[0]
  const items = feedChannel.item
    .filter(({ enclosure }) => enclosure)
    .map(feedItem => {
      const enclosure = feedItem.enclosure[0]['$']
      return {
        title: feedItem.title[0],
        link: feedItem.link[0],
        description: feedItem.description[0],
        date: feedItem.pubDate[0],
        enclosure,
      }
    })
  const meta = {
    title: feedChannel.title[0],
    description: feedChannel.description[0],
    image: feedChannel.image[0].url[0],
    author: feedChannel['itunes:author'][0],
  }
  const cleanFeed: ApiFeedResponse = {
    meta,
    items,
  }

  res.setHeader('Content-Type', 'application/json')
  res.send(cleanFeed)
})

if (config.IS_DEV && webpackConfig.output) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/',
    }),
  )

  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
      path: `/__webpack_hmr`,
      heartbeat: 10 * 1000,
    }),
  )
}

app.get('/lookup', async function (req, res) {
  const response = await fetch(`https://itunes.apple.com/lookup?id=${req.query.id}`)
  const json = await response.json()
  res.setHeader('Content-Type', 'application/json')
  res.send(json)
})

app.listen(config.SERVER_PORT, () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`)
})
