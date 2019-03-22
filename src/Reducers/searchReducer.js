import {
	SEARCH_CALLED_SUCCESS,
	SEARCH_CALLED_FAILED
} from '../constants'
const initialState = {
	search: [],
	error: ''
};

const searchReducer = (state = initialState, action) => {
	switch(action.type) {
		case SEARCH_CALLED_SUCCESS:
			return {
				...state,
				search: action.data
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