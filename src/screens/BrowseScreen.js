// Import necessary components
import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import skateVideos from '../api/mock/skate-videos.json'

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  padding: 20px;
  background-color: #f4f4f4;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

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

// BrowseScreen component
export default function BrowseScreen({ navigation }) {

  const [videos, setVideos] = useState([])
  
  const handleItemPress = () => {
    // Navigate to the desired screen
    navigation.navigate('YourTargetScreen'); // Replace 'YourTargetScreen' with your target screen name
  };

  useEffect(() => {
    setVideos(skateVideos)
  }, [])

  return (
    <Container>
      <StatusBar style="auto" />
      {/* ... */}
      <ItemList>
        {videos.map((video, index) => (
          <Item key={index} onPress={handleItemPress}>
            <Thumbnail source={{ uri: video.thumbnail }} />
            <Content>
              <ItemTitle>{video.title}</ItemTitle>
              <Description>{video.description}</Description>
              <Metadata>{video.metadata}</Metadata>
            </Content>
            <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
          </Item>
        ))}
      </ItemList>
    </Container>
  );
}
