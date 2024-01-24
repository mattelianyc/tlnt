import React from 'react';
import { StatusBar, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, ListItem, ListItemText, ListItemIcon, GlobalText } from '../styles/StyledComponents';

// Define the list of settings items
const settingsItems = [
  { key: 'gift-cards', title: 'Gift Cards' },
  { key: 'chat-settings', title: 'Chat Settings' },
  { key: 'notification-settings', title: 'Notification Settings' },
  { key: 'change-email', title: 'Change Email' },
  { key: 'change-password', title: 'Change Password' },
  { key: 'security-privacy', title: 'Security and Privacy' },
  { key: 'invite-code', title: 'Got an Invite Code?' },
  { key: 'terms-of-service', title: 'Terms of Service' },
  { key: 'accessibility-faqs', title: 'Accessibility FAQs' },
  { key: 'app-performance', title: 'App Performance' },
  { key: 'restore-purchases', title: 'Restore Purchases' }
];

export default function SettingsScreen() {
  const handleItemPress = (itemKey) => {
    // Handle the press action for each item
    console.log(`Pressed: ${itemKey}`);
  };

  const renderItem = ({ item }) => (
    <ListItem onPress={() => handleItemPress(item.key)}>
      <GlobalText>{item.title}</GlobalText>
      <ListItemIcon>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </ListItemIcon>
    </ListItem>
  );

  return (
    <Container>
      <StatusBar style="auto" />
      {/* <TitleText>Settings</TitleText> */}
      <FlatList
        data={settingsItems}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </Container>
  );
}
