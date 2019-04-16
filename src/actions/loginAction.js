import {
    LOGIN_USER,
    VERIFY_USER
} from '../constants'

export const LoginAction = values => ({
    type: LOGIN_USER,
    values
});

export const verifyUser = (values, code) => ({
    type: VERIFY_USER,
    values,
    code
});