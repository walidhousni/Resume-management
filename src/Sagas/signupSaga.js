import { put, all, takeLatest, call } from "redux-saga/effects";
import {
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED
} from '../constants';
import axios from 'axios';

import history from '../utils/history';

const { REACT_APP_BASEURL } = process.env;

function* watchSignupUser() {
    yield takeLatest(SIGNUP_USER, signupUserSaga)
}


function* signupUserSaga({ values }) {
    try {
        const res = yield call(signupUserAPI, values);
        {

            if (res.status = 201) { 

                yield put({
                    type: SIGNUP_USER_SUCCESS,
                    msg: true
                });

                history.push('/login');

            }
        }

    } catch (err) {
        yield put({
            type: SIGNUP_USER_FAILED,
            msg: false

        });
    }
}
const signupUserAPI = (values) => axios.post(`${REACT_APP_BASEURL}/access/register`, values)
export default function* rootSignupSaga() {
    yield all([
        watchSignupUser(),
    ])
}