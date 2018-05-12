import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import RootStack from './components/screens';
import store from './store';

const App = () => (
  <Provider store={store} >
    {/* Todo: Add error message component here */}
    <RootStack />
  </Provider>
);

export default App;

