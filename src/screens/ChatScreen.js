import React from 'react';
import { StatusBar, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';

// Dummy data for message threads
const threads = [{"id": "1", "name": "Tony Hawk", "message": "Hey, let's skate this weekend!", "time": "9:00 AM"}, {"id": "2", "name": "Rodney Mullen", "message": "Working on a new trick.", "time": "Yesterday"}, {"id": "3", "name": "Nyjah Huston", "message": "That last session was epic.", "time": "8:45 PM"}, {"id": "4", "name": "Bam Margera", "message": "Can you send that video?", "time": "7:30 PM"}, {"id": "5", "name": "Daewon Song", "message": "Check out this new park.", "time": "6:15 PM"}, {"id": "6", "name": "Paul Rodriguez", "message": "Let's hit the streets tomorrow.", "time": "5:00 PM"}, {"id": "7", "name": "Leticia Bufoni", "message": "Loved your latest trick!", "time": "4:50 PM"}, {"id": "8", "name": "Ryan Sheckler", "message": "Can you film me on Saturday?", "time": "3:45 PM"}, {"id": "9", "name": "Elissa Steamer", "message": "That was a great competition.", "time": "2:30 PM"}, {"id": "10", "name": "Andrew Reynolds", "message": "Need new gear recommendations.", "time": "1:20 PM"}];

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
`;

const ThreadItem = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const ThreadName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const ThreadPreview = styled.Text`
  font-size: 14px;
  color: #666;
`;

const ThreadTime = styled.Text`
  font-size: 14px;
  color: #aaa;
  position: absolute;
  right: 20px;
  top: 15px;
`;

const ChatScreen = ({ navigation, searchVisible, videos }) => {
  const renderItem = ({ item }) => (
    <ThreadItem onPress={() => {/* Navigate to individual chat screen */}}>
      <ThreadName>{item.name}</ThreadName>
      <ThreadPreview>{item.message}</ThreadPreview>
      <ThreadTime>{item.time}</ThreadTime>
    </ThreadItem>
  );

  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ?
        <GlobalSearchList videos={videos} /> : (
          <>
            <TitleText>Messages</TitleText>
            <FlatList
              data={threads}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </>
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

