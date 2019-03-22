import {
	SEARCH_CALLED
} from '../constants'

export const SearchAction = values => ({
	type: SEARCH_CALLED,
	values
});