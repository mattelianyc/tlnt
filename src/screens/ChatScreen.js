import React from 'react';
import { StatusBar, FlatList, Image, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import threads from '../api/mock/threads.json'
import { GlobalText } from '../styles/StyledComponents';

const ChatScreen = ({ navigation, searchVisible, videos }) => {
  
  const renderItem = ({ item }) => (
    <ThreadItem onPress={() => {/* Navigate to individual chat screen */}}>
      <Avatar source={{ uri: item.avatar }} />
      <View style={{ flex: 1 }}>
        <ThreadName>{item.name}</ThreadName>
        <ThreadPreview>{item.message}</ThreadPreview>
      </View>
      <ThreadTime>{item.time}</ThreadTime>
    </ThreadItem>
  );
  
  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ?
        <GlobalSearchList videos={videos} /> : (
          <FlatList
            data={threads}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )
      }
    </Container>
  );
};

const mapStateToProps = (state) => ({
  searchVisible: state.searchVisible,
  videos: state.videos,
});

export default connect(mapStateToProps)(ChatScreen);

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const ThreadItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const ThreadName = styled(GlobalText)`
  font-size: 18px;
  font-weight: bold;
`;

const ThreadPreview = styled(GlobalText)`
  font-size: 14px;
  color: white;
`;

const ThreadTime = styled(GlobalText)`
  font-size: 14px;
  color: #aaa;
  position: absolute;
  right: 20px;
  top: 15px;
`;
