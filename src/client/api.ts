import {
  ApiFeedResponse,
  ApiSearchResults,
  ApiSearchOptions,
  ApiFetchFeedOptions,
  ApiFetchByIdOptions,
  ApiLookupResults,
} from '../types'

export const fetchSearchResults = async (options: ApiSearchOptions): Promise<ApiSearchResults> => {
  const searchString = new URLSearchParams(options).toString()
  const response = await fetch(`/api/search?${searchString}`)
  const json = await response.json()
  return json
}

export const fetchFeed = async (options: ApiFetchFeedOptions): Promise<ApiFeedResponse> => {
  const searchString = new URLSearchParams(options).toString()
  const response = await fetch(`/api/feed?${searchString}`)
  const json = await response.json()
  return json
}

export const fetchCollectionById = async (options: ApiFetchByIdOptions): Promise<ApiLookupResults> => {
  const searchString = new URLSearchParams(options).toString()
  const response = await fetch(`/api/lookup?${searchString}`)
  const json = await response.json()
  return json
}
