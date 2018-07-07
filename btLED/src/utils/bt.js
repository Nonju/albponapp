import EasyBluetooth from 'easy-bluetooth-classic';
import { find } from 'lodash';

import store from '../store';
import { add, setSearchingState } from '../actions/bt';
import { hc05 } from './values';

// const btActive = () => true; // Todo: implement
const btActive = async () => await EasyBluetooth.isAdapterEnable()
	.catch(e => console.error('Error checking if adapter enabled:', e));
const getBtState = () => store.getState().bt || {};
const currentlySearching = () => getBtState().searching;
const getDeviceById = deviceId => find(getBtState().devices, d => d.uuid === deviceId);

const config = {
	...hc05,
	bufferSize: 1024,
	characterDelimiter: '\n',
};

EasyBluetooth.init(config)
	.then(config => console.log('Bt initiated;', config))
	.catch(e => console.error('Error initiatin bluetooth:', e));

const startScan = () => {
	console.log('Started bt scanning');
	EasyBluetooth.startScan()
		.catch(e => console.error('Error scanning devices:', e));
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
	if (validateDevice(device)) {
		addDeviceToStore(device);
	}
};

// Todo: find out why not triggered by status change
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
		.catch(e => console.error('Error ending bt scan:', e));
};

export const connect = deviceId => {
	const device = getDeviceById(deviceId);
	EasyBluetooth.connect(device)
		.then(() => console.log('Connected to device:', deviceId))
		.catch(e => console.error('Error connecting to device', e));
};

export const disconnect = () => {
	EasyBluetooth.disconnect();
};

export const write = data => {
	EasyBluetooth.writeln(data)
		.then(() => console.log('Writing data'))
		.catch(e => console.error('Error writing data to device', e, data));
};
