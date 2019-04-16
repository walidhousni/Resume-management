import { put, all, takeLatest, call } from "redux-saga/effects";
import {
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '../constants';
import axios from 'axios';

const { REACT_APP_BASEURL } = process.env;

function* watchSignupUser() {
    yield takeLatest(SIGNUP_USER, signupUserSaga)
}

function* watchResetPass() {
    yield takeLatest(RESET_PASSWORD, resetPasswordSaga)
}


function* resetPasswordSaga({ values, id }) {
    try {
        const res = yield call(resetPasswordAPI, {values, id});
        yield put({
            type: RESET_PASSWORD_SUCCESS,
            msg: 'Reset Password Successfully!'
        });
    } catch (err) {
        yield put({
            type: RESET_PASSWORD_FAILED,
            msg: 'Reset Password Failed!'

        });
    }
}

function* signupUserSaga({ values }) {
    try {
        const res = yield call(signupUserAPI, values);
        yield put({
            type: SIGNUP_USER_SUCCESS,
            msg: 'User Added Successfully!'
        });
    } catch (err) {
        yield put({
            type: SIGNUP_USER_FAILED,
            msg: 'User Added Failed!'

        });
    }
}

const signupUserAPI = (values) => {
    let TOKEN = localStorage.getItem('Token')
    return axios.post(`${REACT_APP_BASEURL}/user`, values, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    }).then(response => response.data)
        .catch(err => {
            throw err;
        });
}

const resetPasswordAPI = ({ values, id }) => {
    let TOKEN = localStorage.getItem('Token')
    return axios.post(`${REACT_APP_BASEURL}/user/reset/${id}`, values, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    }).then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export default function* rootSignupSaga() {
    yield all([
        watchSignupUser(),
        watchResetPass(),
    ])
}