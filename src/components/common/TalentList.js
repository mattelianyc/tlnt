import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalText } from '../../styles/StyledComponents';

const TalentList = ({ talents, onSubscribe, onUnsubscribe }) => {
  // State to track subscriptions for each talent
  const [subscriptions, setSubscriptions] = React.useState({});

  const handleSubscribe = (talentId) => {
    setSubscriptions(prev => ({ ...prev, [talentId]: true }));
    console.log(`Subscribing to talent with ID: ${talentId}`);
    // Add real subscription logic here
  };
  
  const handleUnsubscribe = (talentId) => {
    setSubscriptions(prev => ({ ...prev, [talentId]: false }));
    console.log(`Unsubscribing from talent with ID: ${talentId}`);
    // Add real unsubscription logic here
  };

  return (
    <ListContainer>
      {talents.map(talent => (
        <TalentItem key={talent.id}>
          <TalentContent>
            <TalentTitle>{talent.name}</TalentTitle>
          </TalentContent>
          {subscriptions[talent.id] ? (
            <TalentAction onPress={() => handleUnsubscribe(talent.id)}>
              <Ionicons name="remove-outline" size={24} color="white" />
            </TalentAction>
          ) : (
            <TalentAction onPress={() => handleSubscribe(talent.id)}>
              <Ionicons name="add-outline" size={24} color="white" />
            </TalentAction>
          )}
        </TalentItem>
      ))}
    </ListContainer>
  );
};

export default TalentList;

const ListContainer = styled.ScrollView`
  flex: 1;
`;

const TalentItem = styled.View`
  flex-direction: row;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  align-items: center;
`;

const TalentContent = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const TalentTitle = styled(GlobalText)`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const TalentAction = styled.TouchableOpacity`
  padding: 5px;
  margin-top: 5px;
`;

const ChevronIcon = styled(Ionicons)`
  color: #ccc;
  font-size: 24px;
`;
