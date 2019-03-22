import {
	ADD_PROFILE,
	RESET_FORM,
	SHOW_CODE
} from '../constants'

export const AddProfileAction = values => ({
	type: ADD_PROFILE,
	values
});

export const resetForm  = () => ({
	type: RESET_FORM
})

export const showCode  = codeStatus => ({
	type: SHOW_CODE,
	codeStatus
})