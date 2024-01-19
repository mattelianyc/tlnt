// BrowseScreen.js
import React from 'react';
import { StatusBar } from 'react-native';
import { Container, TitleText } from '../styles/StyledComponents';

export default function AccountScreen() {
  return (
    <Container>
      <TitleText>account</TitleText>
      <StatusBar style="auto" />
    </Container>
  );
}
