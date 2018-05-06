import { concat } from 'lodash';

import {
	SEARCH_START,
	SEARCH_STOP,
	ADD,
} from '../../actionTypes/bt';

import {
	searchStart,
	searchStop,
} from '../../utils/bt';

export default async (state={
	searching: false,
	devices: [],
}, action={}) => {

	switch (action.type) {		
		case SEARCH_START: {
			const success = await searchStart();
			return { ...state, searching: success };
		}
		case SEARCH_STOP: {
			searchStop();
			return { ...state, searching: false };
		}
		case ADD: {
			const { devices } = state;
			const { device } = action;
			return {
				...state,
				devices: concat(devices, [device]),
			}
		}
		default: { return state; }
	}

};