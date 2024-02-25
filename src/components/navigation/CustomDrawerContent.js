import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { performLogout } from '../../redux/slices/authSlice';
import NotificationModal from '../common/NotificationModal';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(performLogout());
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView style={{backgroundColor: 'black'}} {...props}>
      {props.state.routes.map((route) => (
        <DrawerItem
          key={route.key}
          label={route.name.charAt(0).toUpperCase() + route.name.slice(1)}
          onPress={() => {
            // Close the drawer upon navigation
            props.navigation.navigate(route.name);
            setTimeout(() => {
              props.navigation.closeDrawer();
            }, 100);
          }}
          labelStyle={{ color: 'white' }}
          icon={({ color, size }) => (
            <Ionicons name={route.name === 'home' ? "home-outline" : "person-outline"} color={color} size={size} />
          )}
        />
      ))}
      <NotificationModal />

      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        labelStyle={{ color: 'white' }}
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" color={color} size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
