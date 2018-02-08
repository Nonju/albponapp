
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './src/store/reducers';
import App from './src/App';

let store = createStore(reducers);

AppRegistry.registerComponent('btLED', () => (
	<Provider store={store}>
		<App />
	</Provider>
));

