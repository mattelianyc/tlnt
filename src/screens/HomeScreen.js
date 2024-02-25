import React, { useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux'; // Import useSelector hook
import AnnouncementCard from '../components/common/AnnouncementCard';
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import VideoList from '../components/common/VideoList';
import { Container, SectionHeader, SectionHeaderText } from '../styles/StyledComponents';

const HomeScreen = ({ navigation }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  // Use useSelector hook to access the Redux state
  const searchVisible = useSelector((state) => state.search.searchVisible); // Adjust path based on your state structure
  const videos = useSelector((state) => state.videos.videos); // Adjust path based on your state structure
  
  const handleAnnouncementPress = () => {
    // Handle announcement button press logic
  };

  const closeAnnouncement = () => {
    setShowAnnouncement(false);
  };

  // Example data for each section
  const newVideos = videos.slice(0, 5); 
  const mostPopular = videos.slice(5, 10);
  const streetVideos = videos.slice(10, 15);

  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ? (
        <GlobalSearchList />
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
          <SectionHeader>
            <SectionHeaderText>New Arrivals</SectionHeaderText>
          </SectionHeader>
          <VideoList videos={newVideos} layout='horizontal' />

          {/* Most Popular Section */}
          <SectionHeader>
            <SectionHeaderText>Most Popular</SectionHeaderText>
          </SectionHeader>
          <VideoList videos={mostPopular} layout='horizontal' />

          {/* Street Section */}
          <SectionHeader>
            <SectionHeaderText>Street</SectionHeaderText>
          </SectionHeader>
          <VideoList videos={streetVideos} layout='horizontal' />
        </ScrollView>
      )}
    </Container>
  );
};

export default HomeScreen;
