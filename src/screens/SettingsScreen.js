// BrowseScreen.js
import React from 'react';
import { StatusBar } from 'react-native';
import { Container, TitleText } from '../styles/StyledComponents';

export default function SettingsScreen() {
  return (
    <Container>
      <TitleText>Settings</TitleText>
      <StatusBar style="auto" />
    </Container>
  );
}
