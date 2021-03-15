import path from 'path'
import express from 'express'
import fetch from 'node-fetch'
import * as config from '@podcast/config'
import xml2js from 'xml2js'
import { RawFeedResponse, ApiFeedResponse, ApiSearchResults } from '@podcast/types'
import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Podcast {
    id: ID!
    title: String!
    author: String!
    image: String!
    feedUrl: String!
    feed: Feed
  }

  type Feed {
    description: String!
    episodes: [Episode]!
  }

  type Episode {
    image: String!
    title: String!
    link: String!
    description: String!
    date: String!
    length: String!
    type: String!
    url: String!
  }

  type Query {
    search(term: String!): [Podcast]!
    getPodcastById(id: ID): Podcast
  }
`

const resolvers = {
  Query: {
    search: async (_, args) => {
      const result = await fetch(`https://itunes.apple.com/search?term=${args.term}&media=podcast`)

      const { results }: ApiSearchResults = await result.json()

      return results.map(rawResult => ({
        id: rawResult.collectionId,
        title: rawResult.trackName,
        author: rawResult.artistName,
        image: rawResult.artworkUrl100,
        feedUrl: rawResult.feedUrl,
      }))
    },
    getPodcastById: async (_, args) => {
      const result = await fetch(`https://itunes.apple.com/lookup?id=${args.id}`)

      const { results }: ApiSearchResults = await result.json()

      if (!results.length) return null

      const rawResult = results[0]

      return {
        id: rawResult.collectionId,
        title: rawResult.trackName,
        author: rawResult.artistName,
        image: rawResult.artworkUrl100,
        feedUrl: rawResult.feedUrl,
      }
    },
  },
  Podcast: {
    feed: async ({ feedUrl }) => {
      const response = await fetch(feedUrl)
      const text = await response.text()
      const parser = new xml2js.Parser()
      const feed: RawFeedResponse = await parser.parseStringPromise(text)

      const feedChannel = feed.rss.channel[0]
      const episodes = feedChannel.item
        .filter(({ enclosure }) => enclosure)
        .map(feedItem => {
          const enclosure = feedItem.enclosure[0]['$']
          return {
            image: feedChannel.image[0].url[0],
            title: feedItem.title[0],
            link: feedItem.link[0],
            description: feedItem.description[0],
            date: feedItem.pubDate[0],
            length: enclosure.length,
            type: enclosure.type,
            url: enclosure.url,
          }
        })

      return {
        description: feed.rss.channel[0].description[0],
        episodes,
      }
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

console.log(`*******************************************`)
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`config: ${JSON.stringify(config, null, 2)}`)
console.log(`*******************************************`)

const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/api/search', async (req, res) => {
  const result = await fetch(`https://itunes.apple.com/search?term=${req.query.term}&media=${req.query.media}`)

  const json = await result.json()

  res.json({ status: 'ok', json }).end()
})

app.get('/api/feed', async function (req, res) {
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

app.get('/api/lookup', async function (req, res) {
  const response = await fetch(`https://itunes.apple.com/lookup?id=${req.query.id}`)
  const json = await response.json()
  res.setHeader('Content-Type', 'application/json')
  res.send(json)
})

app.listen(config.SERVER_PORT, () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`)
})
