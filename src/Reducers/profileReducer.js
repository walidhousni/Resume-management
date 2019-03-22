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
	SHOW_CODE
} from '../constants'
const initialState = {
	addProfileStatut: '',
	updateProfileStatut: '',
	profieSelected: {},
	uploadFileStatus:'',
	showCode: true,
	error: ''
};

const profileReducer = (state = initialState, { type, msg, err, data, status, codeStatus }) => {
	switch(type) {
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
			return {
                ...state,
                addProfileStatut: msg
			}
		case ADD_PROFILE_FAILED:
			return {
                ...state,
                updateProfileStatut: msg
			}
		case UPDATE_PROFILE_SUCCESS: 
			return {
				...state,
				updateProfileStatut: msg
			}
		case UPDATE_PROFILE_FAILED:
			return {
                ...state,
                addProfileStatut: msg
			}
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