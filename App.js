import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from './src/store/configStore';

import AppWithNavigation from './src/AppWithNavigation';

export const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppWithNavigation />
    </Provider>
  );
};

export default App;
