import { SagaIterator } from 'redux-saga'
import { spawn, all, call } from 'redux-saga/effects'
import * as storeSagas from './store/sagas'

export default function* rootSaga(): SagaIterator<void> {
  yield all(
    Object.entries(storeSagas)
      .filter(([_name, func]) => typeof func === 'function')
      .map(([_name, saga]) => saga)
      .map(saga =>
        spawn(function* () {
          while (true) {
            try {
              yield call(saga)
              break
            } catch (e) {
              console.log(e)
            }
          }
        }),
      ),
  )
}
