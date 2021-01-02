import { ApiSearchResult } from 'src/types'
import { RootState } from '../../rootReducer'

export function getSearchResults(state: RootState): ApiSearchResult[] {
  return state.search.searchResults
}
