import {
	SEARCH_CALLED_SUCCESS,
	SEARCH_CALLED_FAILED,
	SEARCH_DATA,
	GET_LOCATION,
	GET_USERS_SUCCESS,
	GET_USERS_FAILED,
	GET_PARAMS_SUCCESS,
	GET_PARAMS_FAILED
} from '../constants'
const initialState = {
	search: [],
	searchData: {},
	users: [],
	params: [],
	error: ''
};

const searchReducer = (state = initialState, action) => {
	switch(action.type) {
		case GET_LOCATION:
			return {
				...state,
				location: action.location
			}
		case SEARCH_DATA:
			return {
				...state,
				searchData: action.values
			}
		case GET_USERS_SUCCESS:
			return {
				...state,
				users: action.data
			}
		case GET_USERS_FAILED:
			return {
				...state,
				error: action.error
			}
		case GET_PARAMS_SUCCESS:
			return {
				...state,
				params: action.data
			}
		case GET_PARAMS_FAILED:
			return {
				...state,
				error: action.error
			}
		case SEARCH_CALLED_SUCCESS:
			if(action.data.length !== 0){
				return {
					...state,
					search: action.data,
					error: ''
				}
			} else {
				return {
					...state,
					search: [],
					error: 'No Data Founded!'
				}
			}
		case SEARCH_CALLED_FAILED:
			return {
				...state,
				error: action.error
			}
		default:
			return state;
	}
};

export default searchReducer;