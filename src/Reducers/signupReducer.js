import {
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from '../constants'
import { toast } from 'react-toastify';
const initialState = {

};

const signupReducer = (state = initialState, { type, msg, err, data }) => {
    switch (type) {
        case SIGNUP_USER_SUCCESS:
            return toast.success(msg, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        case SIGNUP_USER_FAILED:
            return toast.error(msg, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        case RESET_PASSWORD_SUCCESS:
            return toast.success(msg, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        case RESET_PASSWORD_FAILED:
            return toast.error(msg, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        default:
            return state;
    }
};

export default signupReducer;