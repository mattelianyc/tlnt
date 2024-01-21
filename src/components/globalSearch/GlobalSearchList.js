import React from 'react';
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

const ItemList = styled(ScrollView)`
  flex: 1;
`;

const Item = styled.View`
  flex-direction: row;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  align-items: center;
`;

const Thumbnail = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const Content = styled.View`
  flex: 1;
`;

const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
`;

const Metadata = styled.Text`
  font-size: 12px;
  color: #aaa;
`;

const ChevronIcon = styled(Ionicons)`
  color: #ccc;
  font-size: 24px;
`;

const GlobalSearchList = ({ videos, searchQuery }) => {
  
  const filteredVideos = searchQuery
    ? videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleItemPress = () => {
    // Navigate to the desired screen
    navigation.navigate('YourTargetScreen'); // Replace with your target screen name
  };

  return (
    <ItemList>
      {searchQuery === '' && (
        <Item>
          <Description>Search skaters, topics, and more...</Description>
        </Item>
      )}
      {searchQuery !== '' && filteredVideos.length === 0 && (
        <Item>
          <Description>No search results match this query...</Description>
        </Item>
      )}
      {filteredVideos.map((video, index) => (
        <Item key={index} onPress={handleItemPress}>
          <Thumbnail source={{ uri: video.thumbnail }} />
          <Content>
            <ItemTitle>{video.title}</ItemTitle>
            <Description>{video.description}</Description>
            <Metadata>{video.metadata}</Metadata>
          </Content>
          <ChevronIcon name="chevron-forward-outline" />
        </Item>
      ))}
    </ItemList>
  );
};

const mapStateToProps = (state) => ({
  videos: state.videos,
  searchQuery: state.searchQuery,
});

export default connect(mapStateToProps)(GlobalSearchList);