import { combineReducers } from 'redux'
import searchReducer from './store/search/reducers'

const rootReducer = combineReducers({
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
