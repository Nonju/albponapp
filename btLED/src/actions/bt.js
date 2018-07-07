import {
	SEARCH_START,
	SEARCH_STOP,
	SET_SEARCHING_STATE,

	ADD,
	CONNECT,
	DISCONNECT,
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
