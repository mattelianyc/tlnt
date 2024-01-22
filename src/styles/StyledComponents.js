// StyledComponents.js
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const TitleText = styled.Text`
  font-family: 'Spartan';
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 0 10px;
`;

export const SectionHeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const SearchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DrawerTop = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
  justify-content: space-between;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalContent = styled.View`
  flex: 0.8; 
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
`;

export const ModalHeader = styled.View`
  padding: 10px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  align-items: center;
  justify-content: space-between;
`;

export const ModalBody = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const ModalFooter = styled.View`
  padding: 10px;
  border-top-width: 1px;
  border-top-color: #eee;
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #eee;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListItemText = styled.Text`
  font-size: 16px;
  color: #000;
`;

export const ListItemIcon = styled.View`
  /* Additional styling if needed */
`;
