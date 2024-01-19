// StyledComponents.js
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const TitleText = styled.Text`
  font-family: 'Spartan';
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  paddingTop: 50px;
`;

export const SearchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SearchBarContainer = styled.View`
  width: 95%;
`;

export const SearchInput = styled.TextInput`
font-family: 'Spartan';
  background-color: #fff;
  border-radius: 5px;
  padding: 10px
`;

export const TopNavLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
`;
  
export const TopNavMiddle = styled.View`
  flex: 10;
  align-items: center;
  justify-content: center;
`;
  
export const TopNavRight = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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
