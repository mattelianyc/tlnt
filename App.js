import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { GlobalStyle } from './src/styles/StyledComponents';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import AuthNavigator from './src/components/navigation/AuthNavigator';
import MainNavigator from './src/components/navigation/MainNavigator';

const Drawer = createDrawerNavigator();

export default function App() {
  
  const [searchVisible, setSearchVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    // Here, check authentication status, e.g., via AsyncStorage, Redux, etc.
    // setIsAuthenticated(true or false based on the check);

    async function loadFonts() {
      await Font.loadAsync({
        // Replace 'YourFontName' with the name you'll use to reference the font in your styles.
        'Moirai': require('./assets/fonts/nyc/nyc1970.otf'), // Replace with the path to your font file.
        'nyc': require('./assets/fonts/morai/MoiraiOne-Regular.ttf'), // Replace with the path to your font file.
        // Add additional fonts here as needed.
      });
      setFontsLoaded(true);
    }
    
    loadFonts();
  

  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? (
          <AuthNavigator />
        ) : (
          <MainNavigator />
        )}
      </NavigationContainer>
    </Provider>
  );
}