import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerTop } from '../../styles/StyledComponents';
import NotificationModal from '../common/NotificationModal'; // Adjust the path as necessary
import { View } from 'react-native';

const CustomDrawerContent = (props) => {
  const filteredItems = props.state.routes.filter(
    route => route.name !== 'profile' && route.name !== 'settings'
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerTop>
        {filteredItems.map(route => (
          <DrawerItem
            key={route.key}
            label={route.name}
            onPress={() => props.navigation.navigate(route.name)}
          />
        ))}
        <NotificationModal />
      </DrawerTop>

      <View>
        <DrawerItem label="account" onPress={() => props.navigation.navigate('account')} />
        <DrawerItem label="settings" onPress={() => props.navigation.navigate('settings')} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
