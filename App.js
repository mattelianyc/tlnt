import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { checkAuthenticationStatus } from './src/redux/slices/authSlice';
import AuthNavigator from './src/components/navigation/AuthNavigator';
import MainNavigator from './src/components/navigation/MainNavigator';
import * as Font from 'expo-font';
import { StripeProvider } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  // Implement the payment screen here
  // This is a placeholder for where you would use Stripe's useStripe hook
  // and other functionalities to manage payments.
  return <View><Text>Payment Screen Placeholder</Text></View>;
};

const AppContent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await Font.loadAsync({
          'Moirai': require('./assets/fonts/nyc/nyc1970.otf'),
          'nyc': require('./assets/fonts/morai/MoiraiOne-Regular.ttf'),
        });

        await dispatch(checkAuthenticationStatus()).unwrap();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        setAuthCheckCompleted(true);
      }
    };

    loadResourcesAndDataAsync();
  }, [dispatch]);

  if (!fontsLoaded || !authCheckCompleted) {
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
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}>
        <AppContent />
      </StripeProvider>
    </Provider>
  );
}