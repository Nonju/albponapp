import { concat } from 'lodash';

import {
	SEARCH_START,
	SEARCH_STOP,
	SET_SEARCHING_STATE,

	ADD,
	CONNECT,
	DISCONNECT,
	SET_CONNECTION_STATUS,
	WRITE_DATA,
} from '../../actionTypes/bt';

import {
	searchStart,
	searchStop,
	connect,
	disconnect,
	write,
} from '../../utils/bt';

export default (state={
	searching: false,
	devices: [],
	connectedDevice: '', // ID of device
	connectionStatus: '', // Current status of device connection
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
		case SET_CONNECTION_STATUS: {
			const { status } = action;
			return {
				...state,
				connectionStatus: status,
			};
		}
		case WRITE_DATA: {
			const { data } = action;
			write(data);
			return state;
		}
		default: { return state; }
	}

};