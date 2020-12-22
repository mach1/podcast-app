import { getSearchString } from '../utils'

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

export const fetchSearchResults = async (options: ApiSearchOptions): Promise<ApiSearchResults> => {
  const response = await fetch(`/search?${getSearchString(options)}`)
  const json = await response.json()
  return json
}
