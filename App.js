import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { checkAuthenticationStatus, fetchUserProfile } from './src/redux/slices/authSlice';
import AuthNavigator from './src/components/navigation/AuthNavigator';
import MainNavigator from './src/components/navigation/MainNavigator';
import * as Font from 'expo-font';
import { StripeProvider } from '@stripe/stripe-react-native';

const AppContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, profileLoaded } = useSelector((state) => state.auth);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initializationComplete, setInitializationComplete] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Font.loadAsync({
          'Moirai': require('./assets/fonts/nyc/nyc1970.otf'),
          'nyc': require('./assets/fonts/morai/MoiraiOne-Regular.ttf'),
        });

        const authStatus = await dispatch(checkAuthenticationStatus()).unwrap();
        if (authStatus) {
          try {
            await dispatch(fetchUserProfile()).unwrap();
          } catch (error) {
            console.warn("Failed to fetch user profile:", error);
          }
        }
      } catch (e) {
        console.warn("Initialization error:", e);
      } finally {
        setFontsLoaded(true);
        setInitializationComplete(true); // Ensure this is set to true to exit the loading state.
      }
    };

    initializeApp();
  }, [dispatch]);

  // Adjust loading check to account for initialization completion
  if (!fontsLoaded || !initializationComplete) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      {isAuthenticated && profileLoaded ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}>
        <AppContent />
      </StripeProvider>
    </Provider>
  );
}
