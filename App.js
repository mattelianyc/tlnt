import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './src/components/navigation/CustomDrawerContent';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BottomTabs from './src/components/navigation/BottomTabs';
import CustomNavbar from './src/components/navigation/CustomNavbar';
import AccountScreen from './src/screens/AccountScreen';
// import { GlobalStyle } from './src/styles/StyledComponents';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';

const Drawer = createDrawerNavigator();

export default function App() {
  
  const [searchVisible, setSearchVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
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
    return <View><Text>Loading...</Text></View>; // Or some other loading content
  }
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            header: ({ navigation }) => (
              <CustomNavbar
                navigation={navigation}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
                routeName={route.name}
              />
            ),
            headerTintColor: 'black',
          })}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="ollie" component={BottomTabs} />
          <Drawer.Screen name="settings" component={SettingsScreen} />
          <Drawer.Screen name="account" component={AccountScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}