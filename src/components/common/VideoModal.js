import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import VideoPlayer from './VideoPlayer';
import bacon from '../../../assets/videos/bacon.mp4'

// Styled Components
const ModalContainer = styled.View`
  flex: 1;
  background-color: #fff;
  paddingTop: 50px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #ff9999;
  color: black;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  align-items: center;
`;

const ActionButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  background-color: ${props => props.isActive ? 'green' : 'white'};
  `;
  
const Tab = styled.TouchableOpacity`
`;
  
const TabText = styled.Text`
  color: ${props => props.isActive ? 'black' : '#aaa'};
  text-decoration: ${props => props.isActive ? 'underline' : 'none'};
`;

const InfoCard = styled.View`
  padding: 50px 10px 50px 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const VideoModal = ({ isVisible, video, onClose }) => {
  
  const [activeTab, setActiveTab] = useState('overview'); // Add this line

  if (!video) return null; // Render nothing if no video is selected

  return (
    <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <ModalContainer>
          <ModalHeader>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
            <Text>{video.title}</Text>
            <TouchableOpacity>
              <Ionicons name="share-social" size={24} />
            </TouchableOpacity>
          </ModalHeader>

          <VideoPlayer videoUri={require('../../../assets/videos/bacon.mp4')} />

          <ActionButton>
            <ActionButtonText>BUY NOW</ActionButtonText>
          </ActionButton>
          {/* Additional buttons and tabs */}
          <TabContainer>
            <Tab onPress={() => setActiveTab('overview')}>
              <TabText isActive={activeTab === 'overview'}>Overview</TabText>
            </Tab>
            <Tab onPress={() => setActiveTab('related')}>
              <TabText isActive={activeTab === 'related'}>Related</TabText>
            </Tab>
          </TabContainer>
          {activeTab === 'overview' && (
            <InfoCard>
              <Text>{video.title}</Text>
              <Text>{video.description}</Text>
              <Text>{video.metadata}</Text>
            </InfoCard>
          )}
          {activeTab === 'related' && (
            <InfoCard>
              <Text>i like big butts</Text>
              <Text>and i can not lie</Text>
            </InfoCard>
          )}
        </ModalContainer>
      </Modal>
  );
};

export default VideoModal;
