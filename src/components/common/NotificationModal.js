import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '../../styles/StyledComponents';

const NotificationModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="notifications" size={32} color="black" />
      </TouchableOpacity>

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
              {/* Modal content goes here */}
            </ModalBody>
            <ModalFooter>
              {/* Optional footer content */}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default NotificationModal;