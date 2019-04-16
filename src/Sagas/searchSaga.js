import { put, all, takeLatest, call } from "redux-saga/effects";
import {
    SEARCH_CALLED,
    SEARCH_CALLED_SUCCESS,
    SEARCH_CALLED_FAILED,
    LOGIN_USER_FAILED,
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    GET_PARAMS,
    GET_PARAMS_SUCCESS,
    GET_PARAMS_FAILED,
} from '../constants';
import axios from 'axios';
import history from '../utils/history'

const { REACT_APP_BASEURL } = process.env;

function* watchSearch() {
    yield takeLatest(SEARCH_CALLED, SearchSaga)
}

function* watchUsers() {
    yield takeLatest(GET_USERS, UsersSaga)
}

function* watchParams() {
    yield takeLatest(GET_PARAMS, ParamsSaga)
}

function* UsersSaga() {
    try {
        const result = yield call(getUsersAPI);
        yield put({
            type: GET_USERS_SUCCESS,
            data: result.allUsers
        });
    } catch (err) {
        yield put({
            type: GET_USERS_FAILED,
            error: err
        });
    }
}

function* ParamsSaga() {
    try {
        const result = yield call(getParamsAPI);
        yield put({
            type: GET_PARAMS_SUCCESS,
            data: result.params
        });
    } catch (err) {
        yield put({
            type: GET_PARAMS_FAILED,
            error: err
        });
    }
}

function* SearchSaga({ values }) {
    try {
        const result = yield call(getCurrentLocAPI, values);
        yield put({
            type: SEARCH_CALLED_SUCCESS,
            data: result
        });
    } catch (err) {
        yield put({
            type: SEARCH_CALLED_FAILED,
            error: err
        });

        if (err.response.status === 401) {
            localStorage.removeItem("Token");
            history.push('/login');
            yield put({
                type: LOGIN_USER_FAILED,
                msg: false

            });
        }

    }
}

const getCurrentLocAPI = ({ term, tech, tool, sen, number }) => {
    let TOKEN = localStorage.getItem('Token')
    return axios.get(`${REACT_APP_BASEURL}/search?term=${term ? term : ''}&tech=${tech ? tech : ''}&tool=${tool ? tool : ''}&sen=${sen ? sen : ''}&number=${number ? number : ''}`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    }).then(response => response.data)
        .catch(err => {
            throw err;
        });
}

const getUsersAPI = () => {
    let TOKEN = localStorage.getItem('Token')
    return axios.get(`${REACT_APP_BASEURL}/user/all`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    }).then(response => response.data)
    .catch(err => {
        throw err;
    });
}

const getParamsAPI = () => {
    let TOKEN = localStorage.getItem('Token')
    return axios.get(`${REACT_APP_BASEURL}/user/params`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    }).then(response => response.data)
    .catch(err => {
        throw err;
    });
}

export default function* rootSearchSaga() {
    yield all([
        watchSearch(),
        watchUsers(),
        watchParams()
    ])
}