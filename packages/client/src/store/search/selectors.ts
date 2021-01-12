import { ApiSearchResult } from '@podcast/types/src'
import { RootState } from '../../rootReducer'

export function getSearchResults(state: RootState): ApiSearchResult[] {
  return state.search.searchResults
}
