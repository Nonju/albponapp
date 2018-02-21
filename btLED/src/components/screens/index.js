
import { StackNavigator } from 'react-navigation';

import MainScreen from './Main';
import BtConnectScreen from './BtConnect';

export default StackNavigator({
		Main: {
			screen: MainScreen,
		},
		BtConnect: {
			screen: BtConnectScreen,
		},
	},
	{
		initialRouteName: 'Main',
	}
);
