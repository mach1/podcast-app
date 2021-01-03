import { FETCH_RESULTS_SUCCESS, SearchActionTypes, SearchState } from './types'

const initialState: SearchState = {
  loading: false,
  searchResults: [],
}

export function searchReducer(state = initialState, action: SearchActionTypes): SearchState {
  switch (action.type) {
    case FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.searchResults,
      }
    default:
      return state
  }
}

export default searchReducer
