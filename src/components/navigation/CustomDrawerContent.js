import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerTop, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '../../styles/StyledComponents';
import { useState } from 'react';

// Custom Drawer Content to add footer items
export default function CustomDrawerContent(props) {

  const [modalVisible, setModalVisible] = useState(false)

  const filteredItems = props.state.routes.filter(
    route => route.name !== 'Profile' && route.name !== 'Settings'
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
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Ionicons name="notifications" size={32} color="black" />
        </TouchableOpacity>
      </DrawerTop>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <DrawerItem label="account" onPress={() => props.navigation.navigate('Account')} />
        <DrawerItem label="settings" onPress={() => props.navigation.navigate('Settings')} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <Text>ACTIVITY</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={32}/>
              </TouchableOpacity>
            </ModalHeader>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      
    </DrawerContentScrollView>
  );
}
