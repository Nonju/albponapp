
import { combineReducers } from 'redux';

// Import reducers here...
import bt from './bt';
import rtest from './rtest';

export default combineReducers({
	// Add collected reducers here...
	bt,
	rtest,
});
