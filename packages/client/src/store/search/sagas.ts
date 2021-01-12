import { call, put, takeEvery } from 'redux-saga/effects'
import { FETCH_RESULTS, FetchResultsAction } from './types'
import { fetchResultsSuccess } from './actions'
import { ApiSearchResults } from '@podcast/types/src'
import * as api from '../../api'
import { SagaIterator } from 'redux-saga'

function* fetchSearchResults(action: FetchResultsAction): SagaIterator<void> {
  const { term } = action.payload
  try {
    const response: ApiSearchResults = yield call(api.fetchSearchResults, {
      media: 'podcast',
      term,
    })
    yield put(fetchResultsSuccess(response.json.results))
  } catch (e) {
    console.log('Failed to fetch search results', e)
  }
}

export function* watchSearchResultsFetch(): SagaIterator<void> {
  yield takeEvery(FETCH_RESULTS, fetchSearchResults)
}
