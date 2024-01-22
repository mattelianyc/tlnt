import React from 'react';
import { StatusBar, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import { connect } from 'react-redux';

const ProfileScreen = ({ navigation, searchVisible, videos }) => {
  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ? 
        <GlobalSearchList videos={videos} /> : (
          <ScrollView>
            <ProfileHeader>
              <Avatar source={{ uri: user.avatar }} />
              <NameText>{user.name}</NameText>
            </ProfileHeader>
            <FollowingList>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Following</Text>
              {user.following.map((skater, index) => (
                <FollowingItem key={index}>
                  <FollowingName>{skater}</FollowingName>
                </FollowingItem>
              ))}
            </FollowingList>
            {/* Add more sections like recent activity, favorite videos, settings, etc. */}
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
  avatar: 'https://placekitten.com/200/200', // Placeholder image
  following: ['Tony Hawk', 'Nyjah Huston', 'Leticia Bufoni'], // Example following
};

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
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

const NameText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const FollowingList = styled.ScrollView`
  padding: 10px;
`;

const FollowingItem = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const FollowingName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
