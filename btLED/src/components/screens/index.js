/*
	https://reactnavigation.org/docs/getting-started.html
*/
import { StackNavigator } from 'react-navigation';

import MainScreen from './Main';
import BtConnectScreen from './BtConnect';
import ConnectedDevice from './ConnectedDevice';

export default StackNavigator({
		Main: {
			screen: MainScreen,
		},
		BtConnect: {
			screen: BtConnectScreen,
		},
		ConnectedDevice: {
			screen: ConnectedDevice,
		},
	},
	{
		initialRouteName: 'Main',
	}
);
