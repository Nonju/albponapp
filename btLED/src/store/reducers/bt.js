import { concat } from 'lodash';

import {
	SEARCH_START,
	SEARCH_STOP,
	SET_SEARCHING_STATE,
	ADD,
} from '../../actionTypes/bt';

import {
	searchStart,
	searchStop,
} from '../../utils/bt';

export default (state={
	searching: false,
	devices: [],
}, action={}) => {

	switch (action.type) {		
		case SEARCH_START: {
			searchStart();
			return state;
		}
		case SEARCH_STOP: {
			searchStop();
			return { ...state, searching: false };
		}
		case SET_SEARCHING_STATE: {
			const { newState } = action;
			return { ...state, searching: newState };
		}
		case ADD: {
			const { devices } = state;
			const { device } = action;

			return {
				...state,
				devices: concat(devices, [device]),
			};
		}
		default: { return state; }
	}

};