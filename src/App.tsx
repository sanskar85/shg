import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './configs/navigators/AppNavigator';
import {LoadStoreData, store} from './store';

function App(): JSX.Element {
  useEffect(() => {
    LoadStoreData();
  }, []);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
