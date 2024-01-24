// AnnouncementCard.js
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { GlobalText } from '../../styles/StyledComponents';

const Card = styled.View`
  background-color: #f0f0f0;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  align-items: center;
`;

const CardText = styled(GlobalText)`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const CardButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const CardButtonText = styled(GlobalText)`
  color: white;
  font-size: 16px;
`;

const CloseIcon = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const AnnouncementCard = ({ text, buttonText, onButtonPress, onClose }) => {
  
  return (
    <Card>
      <CloseIcon onPress={onClose}>
        <Ionicons name="close" size={24} color="black" />
      </CloseIcon>
      <CardText>{text}</CardText>
      <CardButton onPress={onButtonPress}>
        <CardButtonText>{buttonText}</CardButtonText>
      </CardButton>
    </Card>
  );
};

export default AnnouncementCard;