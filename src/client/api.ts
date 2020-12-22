import { getSearchString } from '../utils'
import { ApiFeedResponse, ApiSearchResults, ApiSearchOptions, ApiFetchFeedOptions } from '../types'

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
