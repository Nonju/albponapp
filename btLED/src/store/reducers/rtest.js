
import { INCREASE, DECREASE } from '../../actionTypes/rtest';

const defaultState = {
	amount: 0,
};

const defaultAction = {
	type: '',
};

export default (state=defaultState, action=defaultAction) => {
	switch (action.type) {
		case INCREASE: {
			console.log('In increase reducer');
			return {
				...state,
				amount: state.amount + action.amount,
			};
		}
		case DECREASE: {
			console.log('In decrease reducer');
			return {
				...state,
				amount: state.amount - action.amount,
			};
		}
		default: { return state; }
	}
};

