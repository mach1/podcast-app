import { ApiSearchResult } from 'src/types'
import { SearchActionTypes, FETCH_RESULTS, FETCH_RESULTS_SUCCESS } from './types'

export function fetchResults(term: string): SearchActionTypes {
  return {
    type: FETCH_RESULTS,
    payload: { term },
  }
}

export function fetchResultsSuccess(searchResults: ApiSearchResult[]): SearchActionTypes {
  return {
    type: FETCH_RESULTS_SUCCESS,
    payload: { searchResults },
  }
}
