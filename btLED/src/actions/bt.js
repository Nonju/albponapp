import {
	SEARCH_START,
	SEARCH_STOP,
	SET_SEARCHING_STATE,

	ADD,
	CONNECT,
	DISCONNECT,
	SET_CONNECTION_STATUS,
	WRITE_DATA,
} from '../actionTypes/bt';


export const searchStart = () => ({
	type: SEARCH_START,
});

export const searchStop = () => ({
	type: SEARCH_STOP,
});

export const setSearchingState = newState => ({
	type: SET_SEARCHING_STATE,
	newState: !!newState, // Ensuring that newState is a boolean
});

export const add = device => ({
	type: ADD,
	device,
});

export const connect = deviceId => ({
	type: CONNECT,
	deviceId,
});
export const disconnect = () => ({
	type: DISCONNECT,
});

export const setConnectionStatus = status => ({
	type: SET_CONNECTION_STATUS,
	status,
});

export const write = data => ({
	type: WRITE_DATA,
	data,
});
