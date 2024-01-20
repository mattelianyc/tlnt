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
        'Spartan': require('./assets/fonts/LeagueSpartan-VariableFont_wght.ttf'), // Replace with the path to your font file.
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
          initialRouteName="Browse"
          screenOptions={{ 
          header: ({ navigation }) => (
              <CustomNavbar navigation={navigation} searchVisible={searchVisible} setSearchVisible={setSearchVisible} />
            ),
            headerTintColor: 'black' 
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="0LL1E" component={BottomTabs} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}