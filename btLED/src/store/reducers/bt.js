import { concat } from 'lodash';

import {
	SEARCH_START,
	SEARCH_STOP,
	SET_SEARCHING_STATE,

	ADD,
	CONNECT,
	DISCONNECT,
} from '../../actionTypes/bt';

import {
	searchStart,
	searchStop,
	connect,
	disconnect,
} from '../../utils/bt';

export default (state={
	searching: false,
	devices: [],
	connectedDevice: '', // ID of device
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
		case CONNECT: {
			const { deviceId } = action;
			connect(deviceId);
			return {
				...state,
				connectedDevice: deviceId,
			};
		}
		case DISCONNECT: {
			disconnect();
			return {
				...state,
				connectedDevice: '',
			};
		}
		default: { return state; }
	}

};