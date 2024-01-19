// BrowseScreen.js
import React from 'react';
import { StatusBar } from 'react-native';
import { Container, TitleText } from '../styles/StyledComponents';

export default function ChatScreen() {
  return (
    <Container>
      <TitleText>Chat Screen</TitleText>
      <StatusBar style="auto" />
    </Container>
  );
}
