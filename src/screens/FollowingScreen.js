import React, { useEffect } from 'react';
import { StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
// import skaters from '../api/mock/skaters.json';
import { connect } from 'react-redux';
import GlobalSearchList from '../components/globalSearch/GlobalSearchList';
import { Container, SectionHeader, SectionHeaderText, TitleText } from '../styles/StyledComponents';

// Styled components
const SkateboarderList = styled.ScrollView`
  width: 100%;
`;

const SkateboarderCard = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin: 10px;
  border: 1px solid #eee;
`;

const CardLeftSection = styled.View`
  flex: 1;
`;

const SkateboarderName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const FollowerMessageCount = styled.Text`
  font-size: 12px;
  color: #666;
`;

const CardRightSection = styled.View`
  align-items: flex-end;
`;

const AvatarImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const ActiveIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.isActive ? 'green' : 'gray'};
  margin-top: 5px;
`;

const FollowingScreen = ({ navigation, searchVisible, videos, skaters }) => {

  const handleSkaterPress = (skater) => {
    navigation.navigate('SkaterProfile', { skaterId: skater.id });
  };

  return (
    <Container>
      <StatusBar style="auto" />
      {searchVisible ? 
        <GlobalSearchList videos={videos} /> : 
      (
      <SkateboarderList>
        <SectionHeader>
          <SectionHeaderText>Following</SectionHeaderText>
          <TouchableOpacity onPress={() => alert('click')}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </SectionHeader>
        {skaters.map((skater, index) => (
          <SkateboarderCard key={index} onPress={() => handleSkaterPress(skater)}>
            <CardLeftSection>
              <SkateboarderName>{skater.name}</SkateboarderName>
              <FollowerMessageCount>New Messages: {skater.messages || 3}</FollowerMessageCount>
            </CardLeftSection>
            <CardRightSection>
              <AvatarImage source={{ uri: 'https://place-hold.it/140x140/ff9999' }} />
              <ActiveIndicator isActive={skater.isActive} />
            </CardRightSection>
          </SkateboarderCard>
        ))}
      </SkateboarderList>
      )}
          

  </Container>
  )
};

const mapStateToProps = (state) => ({
  searchVisible: state.searchVisible,
  videos: state.videos,
  skaters: state.skaters,
});

export default connect(mapStateToProps)(FollowingScreen);