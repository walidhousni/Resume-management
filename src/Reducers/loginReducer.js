import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    VERIFY_USER_SUCCESS,
    VERIFY_USER_FAILED
} from '../constants'
import { toast } from 'react-toastify';
const initialState = {
    userCur: false
};

const loginReducer = (state = initialState, { type, msg }) => {
    switch (type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                userCur: msg
            }
        case LOGIN_USER_FAILED:
            return toast.error(msg, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        case VERIFY_USER_SUCCESS:
            return toast.success(msg, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        case VERIFY_USER_FAILED:
            return toast.error(msg, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        default:
            return state;
    }
};

export default loginReducer;