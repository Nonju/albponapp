import { BleManager } from 'react-native-ble-plx';

// Used by util functions
let manager = new BleManager();
const btActive = async () => await manager.state() === 'PoweredOn';

const startScan = () => {
	manager.startDeviceScan(null, null, (error, device) => {
		if (error) {
			console.error('Error during device scan:', error);
			return;
		}

		console.log('Found device:'); // Remove
		const { id, name } = device;
		// Todo: call bt.add action factory
	});
};

export const searchStart = async () => {
	if (await btActive()) {
		startScan();
		return true;
	}

	return false;
};

export const searchStop = () => {
	subscription && subscription.remove();
};

export const connect = deviceId => {
	throw 'Not yet implemented';
};

export const disconnect = deviceId => {
	throw 'Not yet implemented';
};
