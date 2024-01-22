import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VideoList = ({ videos, layout }) => {

  const renderItem = (video) => (
    <TouchableOpacity key={video.id} onPress={() => {/* Handle Video Press */}}>
      {layout === 'horizontal' ? (
        <HorizontalItem>
          <Thumbnail layout={layout} source={{ uri: video.thumbnail }} />
          <Content>
            <ItemTitle numberOfLines={1}>{video.title}</ItemTitle>
            <Description numberOfLines={1}>{video.description}</Description>
          </Content>
        </HorizontalItem>
      ) : (
        <ListItem>
          <Thumbnail layout={layout} source={{ uri: video.thumbnail }} />
          <Content>
            <ItemTitle>{video.title}</ItemTitle>
            <Description>{video.description}</Description>
            <Metadata>{video.metadata}</Metadata>
          </Content>
          <ChevronIcon name="chevron-forward-outline" />
        </ListItem>
      )}
    </TouchableOpacity>
  );

  return (
    layout === 'horizontal' ? (
      <HorizontalList>
        {videos.map(video => renderItem(video))}
      </HorizontalList>
    ) : (
      <ScrollView>
        {videos.map(video => renderItem(video))}
      </ScrollView>
    )
  );
};

export default VideoList;

const HorizontalList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  padding: 10px;
`;

const ListItem = styled.View`
  flex-direction: row;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  align-items: center;
`;

const HorizontalItem = styled.View`
  width: 240px; 
  align-items: left;
  margin-right: 30px;
`;

const Thumbnail = styled.Image`
  width: ${props => props.layout === 'horizontal' ? '260px' : '100px'};
  height: ${props => props.layout === 'horizontal' ? '180px' : '100px'};
  border-radius: 8px;
  margin-right: 10px;
`;

const Content = styled.View`
  marginTop: 4px;
  flex: 1;
`;

const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const Description = styled.Text`
  font-size: 13px;
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