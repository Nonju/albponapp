
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './store/reducers';
import RootStack from './components/screens/';

let store = createStore(reducers);

const App = () => (
  <Provider store={store} >
    <RootStack />
  </Provider>
);

export default App;

