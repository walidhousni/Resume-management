import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
} from '../constants'
const initialState = {
    userCur: false,
    access: ''
};

const loginReducer = (state = initialState, { type, msg }) => {
    switch (type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                userCur: msg
            }
        case LOGIN_USER_FAILED:
            return {
                ...state,
                userCur: msg
            }
        default:
            return state;
    }
};

export default loginReducer;