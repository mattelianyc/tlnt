// Import necessary components
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AnnouncementCard from '../components/AnnouncementCard';
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import { connect, useDispatch } from 'react-redux';
import { Container } from '../styles/StyledComponents';

const SectionHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 10px 0px 10px;
  color: #000;
`;

const HorizontalList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  padding: 10px;
`;

const VideoInfo = styled.View`
  width: 240px; 
  align-items: left;
  margin-right: 30px;
  
`;

const VideoTitle = styled.Text`
  font-size: 14px;
  margin-top:5px;
  font-weight: bold;
  color: #000;
  width: 100%;
  overflow: hidden;
`;

const VideoDescription = styled.Text`
  font-size: 12px;
  color: #666;
  width: 100%;
  overflow: hidden;
`;

const VideoThumbnail = styled.Image`
  width: 260px;
  height: 180px;
  margin-right: 10px;
  border-radius: 8px;
`;

const VideoItem = ({ video }) => (
  <TouchableOpacity onPress={() => {/* Handle Video Press */}}>
    <VideoInfo>
      <VideoThumbnail source={{ uri: video.thumbnail }} />
      <VideoTitle numberOfLines={1}>{video.title}</VideoTitle>
      <VideoDescription numberOfLines={1}>{video.description}</VideoDescription>
    </VideoInfo>
  </TouchableOpacity>
);

// HomeScreen component
const HomeScreen = ({ navigation, searchVisible, videos }) => {
  
  // const dispatch = useDispatch();
  // const [videos, setVideos] = useState([]);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
    
  const handleAnnouncementPress = () => {
    // Handle announcement button press logic
  };

  const closeAnnouncement = () => {
    setShowAnnouncement(false);
  };

  // Example data for each section
  const newVideos = videos.slice(0, 5);  // Assuming 'videos' array has the data
  const mostPopular = videos.slice(5, 10);
  const streetVideos = videos.slice(10, 21);

  return (
    <Container>
      <StatusBar style="auto" />
      {
        searchVisible ? (
          <GlobalSearchList videos={videos} />
        ) : (
          <ScrollView>
            {showAnnouncement && (
              <AnnouncementCard
                text="Subscribe for full access!"
                buttonText="Learn More"
                onButtonPress={handleAnnouncementPress}
                onClose={closeAnnouncement}
              />
            )}
            {/* New Videos Section */}
            <SectionHeader>New Arrivals</SectionHeader>
            <HorizontalList>
              {newVideos.map((video, index) => <VideoItem key={index} video={video} />)}
            </HorizontalList>
    
            {/* Most Popular Section */}
            <SectionHeader>Most Popular</SectionHeader>
            <HorizontalList>
              {mostPopular.map((video, index) => <VideoItem key={index} video={video} />)}
            </HorizontalList>
    
            {/* Street Section */}
            <SectionHeader>Street</SectionHeader>
            <HorizontalList>
              {streetVideos.map((video, index) => <VideoItem key={index} video={video} />)}
            </HorizontalList>
          </ScrollView>
        )
      }
    </Container>

  );
};

const mapStateToProps = (state) => ({
  searchVisible: state.searchVisible,
  videos: state.videos,
});

export default connect(mapStateToProps)(HomeScreen);
