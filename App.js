import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { checkAuthenticationStatus } from './src/redux/slices/authSlice'; // Adjust the import path as needed
import AuthNavigator from './src/components/navigation/AuthNavigator';
import MainNavigator from './src/components/navigation/MainNavigator';
import * as Font from 'expo-font';

const AppContent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          'Moirai': require('./assets/fonts/nyc/nyc1970.otf'),
          'nyc': require('./assets/fonts/morai/MoiraiOne-Regular.ttf'),
        });

        // Dispatch checkAuthenticationStatus to update isAuthenticated based on AsyncStorage
        dispatch(checkAuthenticationStatus());
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    };

    loadResourcesAndDataAsync();
  }, [dispatch]);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
