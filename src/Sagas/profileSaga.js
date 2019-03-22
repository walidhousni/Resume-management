import { put, all, takeLatest, call, select } from "redux-saga/effects";
import {
    ADD_PROFILE,
    ADD_PROFILE_SUCCESS,
    ADD_PROFILE_FAILED,
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILED,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILED,
    LOGIN_USER_FAILED
} from '../constants';
import axios from 'axios';
import history from '../utils/history'

const { REACT_APP_BASEURL } = process.env;

function* watchAddProfile() {
    yield takeLatest(ADD_PROFILE, addProfileSaga)
}

function* watchUpdateProfile() {
    yield takeLatest(UPDATE_PROFILE, updateProfileSaga)
}

function* watchGetProfile() {
    yield takeLatest(GET_PROFILE, GetProfileSaga)
}

function* watchUploadfile(){
    yield takeLatest(UPLOAD_FILE, uploadFileSaga)
}

function* GetProfileSaga({ id }) {
    try {

        const res = yield call(getProfileAPI, id);
        yield put({
            type: GET_PROFILE_SUCCESS,
            data: res
        });
    } catch (err) {
        yield put({
            type: GET_PROFILE_FAILED,
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

function* uploadFileSaga({ file }){
    try {
        const res = yield call(uploadFileAPI, file);
        yield put({
            type: UPLOAD_FILE_SUCCESS,
            status: res
        });
    } catch(err) {
        yield put({
            type: UPLOAD_FILE_FAILED,
            err
        });
    }
}

function* addProfileSaga({ values }) {
    try {
    
        // const {profileState} = yield select()
        // const profile = profileState.uploadProfileStatus
        //console.log(values)
        const res = yield call(addProfileAPI, values);
        console.log(res)
        yield put({
            type: ADD_PROFILE_SUCCESS,
            msg: 'OK'
        });
    } catch (err) {
        yield put({
            type: ADD_PROFILE_FAILED,
            msg: 'NOT OK'
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

function* updateProfileSaga({ values }) {
    try {
        yield call(updateProfileAPI, values);
        yield put({
            type: UPDATE_PROFILE_SUCCESS,
            msg: 'UPDATE OK'
        });
    } catch (err) {
        yield put({
            type: UPDATE_PROFILE_FAILED,
            msg: 'UPDATE NOT OK'
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

const addProfileAPI = (values) => {
    let TOKEN = localStorage.getItem('Token')
    return axios.post(`${REACT_APP_BASEURL}/profiles`, values, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    })
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

const uploadFileAPI = (file) => (
    axios.post(`${REACT_APP_BASEURL}/upload`, file)
    .then(response => response.data.results)
    .catch(err => {
        throw err;
    })
)

const updateProfileAPI = (values) => {
    let TOKEN = localStorage.getItem('Token')
    return axios.put(`${REACT_APP_BASEURL}/profiles/${values.id}`, values, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    })
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}


const getProfileAPI = (id) => {

    let TOKEN = localStorage.getItem('Token')
    return axios.get(`${REACT_APP_BASEURL}/profiles/${id}`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    })
        .then(response => response.data)
        .catch(err => {
            throw err;
        });

}
export default function* rootProfileSaga() {
    yield all([
        watchAddProfile(),
        watchGetProfile(),
        watchUpdateProfile(),
        watchUploadfile()
    ])
}