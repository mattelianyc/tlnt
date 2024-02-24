import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import VideoPlayer from './VideoPlayer';
import bacon from '../../../assets/videos/bacon.mp4'
import { ContentContainer, GlobalText, SectionHeaderText, Tab, TabContainer, TabText } from '../../styles/StyledComponents';
import VideoList from './VideoList';
import useShareContent from '../../hooks/useShareContent';

// Styled Components
const ModalContainer = styled.View`
  flex: 1;
  background-color: black;
  paddingTop: 50px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const ModalHeaderText = styled(GlobalText)`
  font-size: 18px;
  max-width: 250px;
  text-align: center;
  font-weight: bold;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #ff9999;
  color: black;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  align-items: center;
`;

const ActionButtonText = styled(GlobalText)`
  color: black;
  font-size: 16px;
`;

const VideoModal = ({ isVisible, video, relatedVideos, onClose }) => {
  
  const shareContent = useShareContent(); // Use the custom hook
  
  const [selectedTab, setSelectedTab] = useState('overview'); 

  if (!video) return null; 

  const handleShare = () => {
    if (video) {
      shareContent({
        title: video.title,
        message: video.description,
        url: video.thumbnail
      });
    }
  };  

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
              <Ionicons name="close" size={24} color={'white'} />
            </TouchableOpacity>
            <ModalHeaderText>{video.title}</ModalHeaderText>
            <TouchableOpacity onPress={handleShare}>
              <Ionicons name="share-social" size={24} color={'white'}/>
            </TouchableOpacity>
          </ModalHeader>

          <VideoPlayer videoUri={require('../../../assets/videos/bacon.mp4')} />

          <ActionButton>
            <ActionButtonText>BUY NOW</ActionButtonText>
          </ActionButton>
          {/* Additional buttons and tabs */}
          <TabContainer>
            {['overview', 'related'].map((tab, index) => (
              <Tab
                key={index}
                onPress={() => setSelectedTab(tab)}
                isActive={selectedTab === tab}
              >
                <TabText isActive={selectedTab === tab}>{tab.toUpperCase()}</TabText>
              </Tab>
            ))}
          </TabContainer>
          <ContentContainer>
            {/* Render content based on the selected tab */}
            {selectedTab === 'overview' && (
            <>
              <GlobalText>{video.description}</GlobalText>
              <GlobalText>{video.metadata}</GlobalText>
            </>
            )}
            {selectedTab === 'related' && (<VideoList videos={relatedVideos}/>)}
          </ContentContainer>
        </ModalContainer>
      </Modal>
  );
};

export default VideoModal;