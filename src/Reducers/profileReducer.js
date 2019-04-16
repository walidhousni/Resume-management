import {
	ADD_PROFILE_SUCCESS,
	ADD_PROFILE_FAILED,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_FAILED,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILED,
	UPLOAD_FILE_SUCCESS,
	UPLOAD_FILE_FAILED,
	RESET_FORM,
	SHOW_CODE,
	GET_SELECTED_NOTE,
	CLOSE_EDITABLE,
	ADD_NOTE_SUCCESS,
	ADD_NOTE_FAILED,
	EDIT_NOTE_SUCCESS,
	EDIT_NOTE_FAILED
} from '../constants'
import { toast } from 'react-toastify';
const initialState = {
	profieSelected: {},
	uploadFileStatus:'',
	selectedNote: '',
	showCode: true,
	isEditable: false,
	noteStatus: '',
	error: ''
};

const profileReducer = (state = initialState, { type, msg, err, data, status, codeStatus, selectedNote, value }) => {
	switch(type) {
		case EDIT_NOTE_FAILED:
			return {
				...state,
				noteStatus: msg
			}
		case EDIT_NOTE_SUCCESS:
			return {
				...state,
				noteStatus: msg
			}
		case ADD_NOTE_FAILED:
			return {
				...state,
				noteStatus: msg
			}
		case ADD_NOTE_SUCCESS:
			return {
				...state,
				noteStatus: msg,
				isEditable: false,
				selectedNote: ''
			}
		case CLOSE_EDITABLE:
			return {
				...state,
				isEditable: value
			}
		case GET_SELECTED_NOTE:
			return {
				...state,
				selectedNote: selectedNote,
				isEditable: true
			}
		case RESET_FORM:
			return {
				...state,
				uploadFileStatus: ''
			}
		case SHOW_CODE:
			return {
				...state,
				showCode: codeStatus
			}
		case ADD_PROFILE_SUCCESS:
			return toast.success(msg, {
				position: toast.POSITION.BOTTOM_LEFT
			});
		case ADD_PROFILE_FAILED:
			return toast.error(msg, {
				position: toast.POSITION.BOTTOM_LEFT
			});
		case UPDATE_PROFILE_SUCCESS: 
			return toast.success(msg, {
				position: toast.POSITION.BOTTOM_LEFT
			});
		case UPDATE_PROFILE_FAILED:
			return toast.error(msg, {
				position: toast.POSITION.BOTTOM_LEFT
			});
		case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
				uploadFileStatus: status
            }
        case UPLOAD_FILE_FAILED:
            return {
                ...state,
                uploadFileStatus: err
            }
		case GET_PROFILE_SUCCESS:
			return {
                ...state,
				profieSelected: data
			}
		case GET_PROFILE_FAILED:
			return {
                ...state,
				error: err
			}
		default:
			return state;
	}
};

export default profileReducer;