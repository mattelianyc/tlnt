import React from 'react';
import { StatusBar, FlatList, TouchableOpacity, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import skaters from '../api/mock/skaters.json';

const FollowingScreen = ({ navigation, searchVisible, videos }) => {
  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ?
        <GlobalSearchList videos={videos} /> : (
          <FlatList
            data={skaters}
            key={item => `${item.id}`} // Ensure the key is a unique string
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
  )
};

const mapStateToProps = (state) => ({
  searchVisible: state.searchVisible,
  videos: state.videos,
});

export default connect(mapStateToProps)(FollowingScreen);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const PostCard = styled.View`
  background-color: #f9f9f9;
  margin: 8px;
  border-radius: 10px;
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

const PostDescription = styled.Text`
  padding: 8px;
`;

const TweetText = styled.Text`
  padding: 8px;
  color: #333;
`;
