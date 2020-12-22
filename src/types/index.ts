export interface RawFeedResponse {
  rss: {
    $: {
      version: string
      'xmlns:atom': string
      'xmlns:cc': string
      'xmlns:itunes': string
      'xmlns:media': string
      'xmlns:content': string
      'xmlns:rdf': string
    }
    channel: [
      {
        'atom:link': {
          $: {
            href: string
            rel: string
            type: string
          }
        }[]
        title: string[]
        pubDate: string[]
        lastBuildDate: string[]
        generator: string[]
        link: string[]
        language: string[]
        copyright: string[]
        docs: string[]
        managingEditor: string[]
        'itunes:summary': string[]
        image: {
          url: string[]
          title: string[]
          link: string[]
        }[]
        'itunes:author': string[]
        'itunes:keywords': string[]
        'itunes:category': {
          $: { text: string }
        }[]
        'itunes:image': { $: { href: string } }[]
        'itunes:explicit': string[]
        'itunes:owner': {
          'itunes:name': string[]
          'itunes:email': string[]
        }[]
        description: string[]
        'itunes:subtitle': string[]
        'itunes:type': string[]
        item: {
          title: string[]
          pubDate: string[]
          guid: { _: string; $: { isPermalink: string } }[]
          link: string[]
          'itunes:image': { $: { href: string } }[]
          description: string[]
          'content:encoded': string[]
          enclosure: { $: { length: string; type: string; url: string } }[]
          'itunes:duration': string[]
          'itunes:explicit': string[]
          'itunes:keywords': string[]
          'itunes:subtitle': string[]
          'itunes:episodeType': string[]
        }[]
      },
    ]
  }
}

export interface ApiFeedResponse {
  meta: {
    title: string
    description: string
    image: string
    author: string
  }
  items: {
    title: string
    link: string
    description: string
    date: string
    enclosure: {
      length: string
      type: string
      url: string
    }
  }[]
}

export interface ApiFetchFeedOptions {
  feedUrl: string
}

export interface ApiSearchResult {
  artistId: 17895151
  artistName: string
  artistViewUrl: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
  collectionArtistId: number
  collectionArtistName: string
  collectionCensoredName: string
  collectionExplicitness: string
  collectionId: number
  collectionName: string
  collectionPrice: number
  collectionViewUrl: string
  country: string
  currency: string
  discCount: number
  discNumber: number
  isStreamable: boolean
  kind: string
  previewUrl: string
  primaryGenreName: string
  releaseDate: string
  trackCensoredName: string
  trackCount: number
  trackExplicitness: string
  trackId: number
  trackName: string
  trackNumber: number
  trackPrice: number
  trackTimeMillis: number
  trackViewUrl: string
  wrapperType: string
  feedUrl: string
}

export interface ApiSearchResults {
  status: string
  json: {
    resultCount: number
    results: ApiSearchResult[]
  }
}

export interface ApiSearchOptions {
  term: string
  media?:
    | 'movie'
    | 'podcast'
    | 'music'
    | 'musicVideo'
    | 'audiobook'
    | 'shortFilm'
    | 'tvShow'
    | 'software'
    | 'ebook'
    | 'all'
}
