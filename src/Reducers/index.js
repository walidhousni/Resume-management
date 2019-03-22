import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import searchReducer from './searchReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
	searchState: searchReducer,
	profileState: profileReducer,
	loginReducer,
	signupReducer,
	form: formReducer
});

export default rootReducer;