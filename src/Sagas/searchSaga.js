import { put, all, takeLatest, call } from "redux-saga/effects";
import {
    SEARCH_CALLED,
    SEARCH_CALLED_SUCCESS,
    SEARCH_CALLED_FAILED,
    LOGIN_USER_FAILED
} from '../constants';
import axios from 'axios';
import history from '../utils/history'

const { REACT_APP_BASEURL } = process.env;

function* watchSearch() {
    yield takeLatest(SEARCH_CALLED, SearchSaga)
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


const getCurrentLocAPI = ({ term, tech, tool, seniority }) => {
    let TOKEN = localStorage.getItem('Token')
    return axios.get(`${REACT_APP_BASEURL}/search?term=${term}&tech=${tech ? tech : ''}&tool=${tool ? tool : ''}&sen=${seniority ? seniority : ''}`, {
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
        watchSearch()
    ])
}