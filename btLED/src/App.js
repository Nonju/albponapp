
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './store/reducers';
import MainScreen from './components/screens/Main';

let store = createStore(reducers);

const App = () => (
  <Provider store={store} >
    <MainScreen />
  </Provider>
);

// TODO: wrap with redux 'connect'
export default App;

