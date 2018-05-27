import { BleManager } from 'react-native-ble-plx';
import { find } from 'lodash';

import store from '../store';
import { add, setSearchingState } from '../actions/bt';

// Used by util functions
let manager = new BleManager();
const btActive = async () => await manager.state() === 'PoweredOn';
const getBtState = () => store.getState().bt || {};
const currentlySearching = () => getBtState().searching;

const startScan = () => {
	const deviceIsUnique = device => {
		const { devices } = getBtState();
		return !find(devices, d => d.id === device.id);
	}
	const addDeviceToStore = device => {
		const { id, name } = device;
		store.dispatch(add({ id, name }));
	};

	if (!manager) {
		console.error('Manager not initiated');
		return;
	}

	manager.startDeviceScan(null, null, (error, device) => {
		if (error) {
			console.error('Error during device scan:', error);
			return;
		}

		// Only add device if not already found
		const unique = deviceIsUnique(device);
		if (deviceIsUnique(device)) {
			addDeviceToStore(device);
		}
	}, e => console.error('Error', e));
};

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
	manager.stopDeviceScan();
};

export const connect = deviceId => {
	throw 'Not yet implemented';
};

export const disconnect = deviceId => {
	throw 'Not yet implemented';
};
