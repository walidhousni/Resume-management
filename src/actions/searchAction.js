import {
	SEARCH_CALLED,
	SEARCH_DATA,
	GET_LOCATION,
	GET_USERS,
	GET_PARAMS
} from '../constants'

export const SearchAction = values => ({
	type: SEARCH_CALLED,
	values
});

export const SearchDataAction = values => ({
	type: SEARCH_DATA,
	values
});

export const getLocation = location => ({
	type: GET_LOCATION,
	location
});

export const getUsers = () => ({
	type: GET_USERS
});

export const getParams = () => ({
	type: GET_PARAMS
});