import {
    SIGNUP_USER,
    RESET_PASSWORD
} from '../constants'

export const SignupAction = values => ({
    type: SIGNUP_USER,
    values
});

export const ResetPassword = (values, id) => ({
    type: RESET_PASSWORD,
    values,
    id
});