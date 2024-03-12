import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import SettingsScreen from '../../screens/SettingsScreen';
import AccountScreen from '../../screens/AccountScreen';
import BottomTabs from './BottomTabs';
import CustomNavbar from './CustomNavbar';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
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
      <Drawer.Screen name="talent" component={BottomTabs} />
      <Drawer.Screen name="settings" component={SettingsScreen} />
      <Drawer.Screen name="account" component={AccountScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
