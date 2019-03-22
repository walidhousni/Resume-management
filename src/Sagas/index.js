import { all } from 'redux-saga/effects'
import rootSearchSaga from './searchSaga'
import rootProfileSaga from './profileSaga'
import rootLoginSaga from './loginSaga'
import rootSignupSaga from './signupSaga'

export default function* rootSaga() {
    yield all([
        rootSearchSaga(),
        rootProfileSaga(),
        rootLoginSaga(),
        rootSignupSaga()
    ]);
}
