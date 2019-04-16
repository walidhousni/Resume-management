import { put, all, takeLatest, call } from "redux-saga/effects";
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    VERIFY_USER,
    VERIFY_USER_SUCCESS,
    VERIFY_USER_FAILED
} from '../constants';
import axios from 'axios';
import history from '../utils/history'

const { REACT_APP_BASEURL } = process.env;

function* watchLoginUser() {
    yield takeLatest(LOGIN_USER, loginUserSaga)
}

function* watchVerifyUser() {
    yield takeLatest(VERIFY_USER, VerifyUserSaga)
}


function* VerifyUserSaga({ values, code }) {
    try {
        const res = yield call(VerifyUserAPI, { values, code });
        {
            if (res.status === 200) {
                yield put({
                    type: VERIFY_USER_SUCCESS,
                    msg: res.statusText
                })
                history.push('/');
            }
        }
    } catch (err) {
        yield put({
            type: VERIFY_USER_FAILED,
            msg: err.response.statusText
        });
    }
}

function* loginUserSaga({ values }) {
    try {
        const res = yield call(loginUserAPI, values);
        {
            if (res.status === 200) {
                localStorage.setItem('Token', res.data.token);
                localStorage.setItem('Username', res.data.username);
                localStorage.setItem('Role', res.data.role);
                yield put({
                    type: LOGIN_USER_SUCCESS,
                    msg: true
                })
                history.push('/search');
            }

        }

    } catch (err) {
        yield put({
            type: LOGIN_USER_FAILED,
            msg: err.response.data.message
        });
    }
}

const loginUserAPI = (values) => axios.post(`${REACT_APP_BASEURL}/access/login`, values)

const VerifyUserAPI = ({ values, code }) => {
    return axios.put(`${REACT_APP_BASEURL}/user/verifyuser/${code}`, values)
        .then(response => response)
        .catch(err => {
            throw err
        });
}

export default function* rootLoginSaga() {
    yield all([
        watchLoginUser(),
        watchVerifyUser()
    ])
}
