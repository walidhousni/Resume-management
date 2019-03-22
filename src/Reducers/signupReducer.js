import {
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED
} from '../constants'
const initialState = {
    signupUserStatut: '',
};

const signupReducer = (state = initialState, { type, msg, err, data }) => {
    switch (type) {
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                signupUserStatut: msg
            }
        case SIGNUP_USER_FAILED:
            return {
                ...state,
                signupUserStatut: msg
            }
        default:
            return state;
    }
};

export default signupReducer;