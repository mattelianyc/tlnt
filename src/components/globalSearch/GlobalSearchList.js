import styled from "styled-components";
import { SearchBarContainer, SearchInput } from "../../styles/StyledComponents";
import { ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function GlobalSearchList({videos}) {

  const handleItemPress = () => {
    // Navigate to the desired screen
    navigation.navigate('YourTargetScreen'); // Replace 'YourTargetScreen' with your target screen name
  };
  
  return (
    <ItemList>
      {videos.map((video, index) => (
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
  )
}

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
