// BrowseScreen.js
import React from 'react';
import { StatusBar } from 'react-native';
import { Container, TitleText } from '../styles/StyledComponents';

export default function ProfileScreen() {
  return (
    <Container>
      <TitleText>Profile</TitleText>
      <StatusBar style="auto" />
    </Container>
  );
}
