import { getSearchString } from '../utils'
import {
  ApiFeedResponse,
  ApiSearchResults,
  ApiSearchOptions,
  ApiFetchFeedOptions,
  ApiFetchByIdOptions,
  ApiLookupResults,
} from '../types'

export const fetchSearchResults = async (options: ApiSearchOptions): Promise<ApiSearchResults> => {
  const response = await fetch(`/search?${getSearchString(options)}`)
  const json = await response.json()
  return json
}

export const fetchFeed = async (options: ApiFetchFeedOptions): Promise<ApiFeedResponse> => {
  const response = await fetch(`/feed?${getSearchString(options)}`)
  const json = await response.json()
  return json
}

export const fetchCollectionById = async (options: ApiFetchByIdOptions): Promise<ApiLookupResults> => {
  const response = await fetch(`/lookup?${getSearchString(options)}`)
  const json = await response.json()
  return json
}
