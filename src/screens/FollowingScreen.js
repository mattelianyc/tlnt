import React from 'react';
import { StatusBar, FlatList, TouchableOpacity, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'; // Import useSelector hook
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import skaters from '../api/mock/skaters.json';
import { GlobalText } from '../styles/StyledComponents';

const FollowingScreen = ({ navigation }) => {
  // Use useSelector hook to access the Redux state
  const searchVisible = useSelector((state) => state.search.searchVisible); // Adjust path based on your state structure
  const videos = useSelector((state) => state.videos.videos); // Adjust path based on your state structure

  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ?
        <GlobalSearchList /> : (
          <FlatList
            data={skaters}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <PostCard>
                <PostHeader>
                  <Avatar source={{ uri: item.avatar }} />
                  <Text>{item.name}</Text>
                </PostHeader>
                {item.postType === 'image' ? (
                  <>
                    <PostImage source={{ uri: item.postImage }} />
                    <PostDescription>{item.postDescription}</PostDescription>
                  </>
                ) : (
                  <TweetText>{item.tweet}</TweetText>
                )}
                <PostActions>
                  <TouchableOpacity>
                    <Ionicons name="heart-outline" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="chatbubble-outline" size={24} color="black" />
                  </TouchableOpacity>
                </PostActions>
              </PostCard>
            )}
          />
        )
      }
    </Container>
  );
};

export default FollowingScreen;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const PostCard = styled.View`
  background-color: #f9f9f9;
  margin: 8px;
  border-radius: 0;
  overflow: hidden;
`;

const PostHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 300px;
`;

const PostActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
`;

const PostDescription = styled(GlobalText)`
  padding: 8px;
`;

const TweetText = styled(GlobalText)`
  padding: 8px;
  color: #333;
`;
