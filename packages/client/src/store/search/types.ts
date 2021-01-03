import { ApiSearchResult } from '@podcast/types'

export interface SearchState {
  loading: boolean
  searchResults: ApiSearchResult[]
}

export const FETCH_RESULTS = 'search/FETCH_RESULTS'
export const FETCH_RESULTS_SUCCESS = 'search/FETCH_RESULTS_SUCCESS'

export interface FetchResultsAction {
  type: typeof FETCH_RESULTS
  payload: {
    term: string
  }
}

interface FetchResultsSuccessAction {
  type: typeof FETCH_RESULTS_SUCCESS
  payload: {
    searchResults: ApiSearchResult[]
  }
}

export type SearchActionTypes = FetchResultsAction | FetchResultsSuccessAction
