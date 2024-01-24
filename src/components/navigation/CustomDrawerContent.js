import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerTop } from '../../styles/StyledComponents';
import NotificationModal from '../common/NotificationModal'; // Adjust the path as necessary
import { View } from 'react-native';
import styled from 'styled-components/native';


const CustomDrawerItem = styled(DrawerItem)` 
  labelStyle: {
    color: 'white'
  }
`;


const CustomDrawerContent = (props) => {
  // const filteredItems = props.state.routes.filter(
  //   route => route.name !== 'profile' && route.name !== '
  // );

  return (
    <DrawerContentScrollView style={{backgroundColor: 'black'}} {...props}>
      {/* <DrawerTop> */}
        {props.state.routes.map(route => (
          <CustomDrawerItem
            key={route.key}
            label={route.name}
            onPress={() => props.navigation.navigate(route.name)}
            labelStyle={{ color: 'white' }} 
          />
        ))}
        <NotificationModal />
      {/* </DrawerTop> */}

      {/* <View>
        <DrawerItem label="account" onPress={() => props.navigation.navigate('account')} />
        <DrawerItem label="settings" onPress={() => props.navigation.navigate('settings')} />
      </View> */}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
