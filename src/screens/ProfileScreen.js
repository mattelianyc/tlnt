import React, { useState } from 'react';
import { StatusBar, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import { connect } from 'react-redux';
import { ContentContainer, GlobalText, Tab, TabContainer, TabText } from '../styles/StyledComponents';
import VideoList from '../components/common/VideoList';

const ProfileScreen = ({ navigation, searchVisible, videos }) => {
  const [selectedTab, setSelectedTab] = useState('my videos');

  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ? 
        <GlobalSearchList videos={videos} /> : (
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
              {/* Render content based on the selected tab */}
              {selectedTab === 'my videos' && <VideoList videos={videos} />}
              {selectedTab === 'subscriptions' && <Text>Subscriptions Content</Text>}
            </ContentContainer>
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

export default connect(mapStateToProps)(ProfileScreen);

// Assuming you have a user object with fan profile data
const user = {
  name: 'Fan Username',
  handle: 'fanhandle123',
  avatar: 'https://placekitten.com/200/200', // Placeholder image
  balance: 120.50,
  following: ['Tony Hawk', 'Nyjah Huston', 'Leticia Bufoni'], // Example following
};

// Styled components
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

