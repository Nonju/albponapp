
import { INCREASE, DECREASE } from '../actionTypes/rtest';

export const increase = amount => ({
	type: INCREASE,
	amount,
});

export const decrease = amount => ({
	type: DECREASE,
	amount,
});
