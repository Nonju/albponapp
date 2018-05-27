import EasyBluetooth from 'easy-bluetooth-classic';
import { find } from 'lodash';

import store from '../store';
import { add, setSearchingState } from '../actions/bt';
import { hc05 } from './values';

const btActive = () => true; // Todo: implement
const getBtState = () => store.getState().bt || {};
const currentlySearching = () => getBtState().searching;

const config = {
	...hc05,
	bufferSize: 1024,
	characterDelimiter: '\n',
};

EasyBluetooth.init(config)
	.then(config => console.log('Bt initiated;', config))
	.catch(e => console.log('Error initiatin bluetooth:', e));

const startScan = () => {
	EasyBluetooth.startScan()
		.catch(e => console.log('Error scanning devices:', e));
};

const onDeviceFound = device => {
	const validateDevice = device => {
		const { devices } = getBtState();
		const { uuids, name } = device;
		const [uuid] = uuids;
		return name && uuid && !find(devices, d => d.uuid === uuid);
	};

	const addDeviceToStore = device => {
		const { uuids, name, address } = device;
		const [uuid] = uuids;
		store.dispatch(add({ uuid, name, address }));
	};

	// Only add device if not already found
	const unique = validateDevice(device);
	if (validateDevice(device)) {
		addDeviceToStore(device);
	}
};

const onStatusChanged = status => {
	console.log('New status:', status);
};

// Add listeners
EasyBluetooth.addOnDeviceFoundListener(onDeviceFound);
EasyBluetooth.addOnStatusChangeListener(onStatusChanged);


// Exports
export const searchStart = async () => {
	const updateSearchingState = (newState = true) => store.dispatch(setSearchingState(newState));

	if (currentlySearching()) {
		return updateSearchingState(true);
	}

	if (await btActive()) {
		startScan();
		return updateSearchingState(true);
	}

	return updateSearchingState(false);
};

export const searchStop = () => {
	EasyBluetooth.stopScan()
		.then(() => console.log('Stopped bt scanning'))
		.catch(e => console.log('Error ending bt scan:', e));
};

export const connect = deviceId => {
	throw 'Not yet implemented';
};

export const disconnect = deviceId => {
	throw 'Not yet implemented';
};


// Todo: Remove requires 'destroy' functionality ??
