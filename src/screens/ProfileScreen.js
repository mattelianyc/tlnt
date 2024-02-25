import React, { useState } from 'react';
import { StatusBar, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux'; // Import useSelector hook
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import VideoList from '../components/common/VideoList';
import { ContentContainer, GlobalText, Tab, TabContainer, TabText } from '../styles/StyledComponents';

const ProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('my videos');
  // Use useSelector hook to access the Redux state
  const searchVisible = useSelector((state) => state.search.searchVisible); // Adjust path based on your state structure
  const videos = useSelector((state) => state.videos.videos); // Adjust path based on your state structure

  // Assuming you have a user object with fan profile data
  const user = {
    name: 'Pachenga',
    handle: 'luisguzman',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS_k25pGXnKgnlojt9vhAGw3WUMjkAkEnYK4wT2TXSwrSFAKj5mXY1tSTM4P6Z9sZ36co&usqp=CAU', // Placeholder image
    balance: 120.50,
    following: ['Tony Hawk', 'Nyjah Huston', 'Leticia Bufoni'], // Example following
  };
  
  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ? (
        <GlobalSearchList />
      ) : (
        <ScrollView>
          <ProfileHeader>
            <Avatar source={{ uri: user.avatar }} />
            <NameText>{user.name}</NameText>
            <HandleText>@{user.handle}</HandleText>
            <BalanceText>Balance: ${user.balance}</BalanceText>
          </ProfileHeader>
          <TabContainer>
            {['my videos', 'subscriptions'].map((tab, index) => (
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
            {selectedTab === 'my videos' && <VideoList videos={videos} />}
            {selectedTab === 'subscriptions' && <Text>Subscriptions Content</Text>}
          </ContentContainer>
        </ScrollView>
      )}
    </Container>
  );
};

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const ProfileHeader = styled.View`
  align-items: center;
  padding: 20px;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const NameText = styled(GlobalText)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const HandleText = styled(GlobalText)`
  font-size: 18px;
  color: #aaa;
`;

const BalanceText = styled(GlobalText)`
  font-size: 18px;
  color: #fff;
  margin-top: 5px;
`;

