import { put, all, takeLatest, call } from "redux-saga/effects";
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
} from '../constants';
import axios from 'axios';
import history from '../utils/history'

const { REACT_APP_BASEURL } = process.env;

function* watchLoginUser() {
    yield takeLatest(LOGIN_USER, loginUserSaga)
}


function* loginUserSaga({ values }) {
    try {
        const res = yield call(loginUserAPI, values);
        {
            if (res.status === 200) {
                localStorage.setItem('Token', res.data.token);
                localStorage.setItem('Username', res.data.username);
                localStorage.setItem('Role', res.data.role);
                console.log(res.data.role)
                yield put({
                    type: LOGIN_USER_SUCCESS,
                    msg: true,
                    username: res.data.username
                })
                history.push('/search');
            }

        }

    } catch (err) {
        yield put({
            type: LOGIN_USER_FAILED,
            msg: false
        });
    }
}
const loginUserAPI = (values) => axios.post(`${REACT_APP_BASEURL}/access/login`, values)
export default function* rootLoginSaga() {
    yield all([
        watchLoginUser(),
    ])
}