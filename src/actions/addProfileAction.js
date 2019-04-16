import {
	ADD_PROFILE,
	ADD_NOTE,
	EDIT_NOTE,
	RESET_FORM,
	SHOW_CODE,
	GET_SELECTED_NOTE,
	CLOSE_EDITABLE
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

export const CloseEditable  = value => ({
	type: CLOSE_EDITABLE,
	value
})

export const AddNote = (note, profileId) => ({
	type: ADD_NOTE,
	note,
	profileId
})

export const EditNote = (note, noteId, profileId) => ({
	type: EDIT_NOTE,
	note,
	noteId,
	profileId
})

export const GetSelectedNote = (comment, id) => ({
	type: GET_SELECTED_NOTE,
	selectedNote: {
		comment,
		id
	}
})