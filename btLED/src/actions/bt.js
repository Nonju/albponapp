import {
	SEARCH_START,
	SEARCH_STOP,
	ADD,
} from '../actionTypes/bt';


export const searchStart = () => ({
	type: SEARCH_START,
});

export const searchStop = () => ({
	type: SEARCH_STOP,
});

export const ADD = device => ({
	type: ADD,
	device,
});
