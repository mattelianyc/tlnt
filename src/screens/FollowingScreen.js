// BrowseScreen.js
import React from 'react';
import { StatusBar } from 'react-native';
import { Container, TitleText } from '../styles/StyledComponents';

export default function FollowingScreen() {
  return (
    <Container>
      <TitleText>Following</TitleText>
      <StatusBar style="auto" />
    </Container>
  );
}
