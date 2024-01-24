import React from 'react';
import { StatusBar, TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { GlobalText } from '../styles/StyledComponents';
import TransactionList from '../components/common/TransactionList'; 

const accountData = {
  balance: 120.50,
  transactions: [
    { id: 't1', description: 'Personalized Training Session', amount: -30.00, date: '2023-01-15' },
    { id: 't2', description: 'Exclusive Video from Tony Hawk', amount: -20.00, date: '2023-01-12' },
    { id: 't3', description: 'Skateboarding Merch T-Shirt', amount: -25.00, date: '2023-01-10' },
    { id: 't4', description: 'Advanced Tricks Tutorial', amount: -15.00, date: '2023-01-08' },
    { id: 't5', description: 'Funds Added', amount: +100.00, date: '2023-01-05' },
    { id: 't6', description: 'Monthly Subscription Fee', amount: -10.00, date: '2023-01-01' },
    { id: 't7', description: 'Custom Skateboard Design', amount: -40.00, date: '2022-12-28' },
    { id: 't8', description: 'Meet-and-Greet Event', amount: -50.00, date: '2022-12-25' }
  ],
};

const AccountScreen = () => {
  
  const handleAddFunds = () => {
    console.log('Add funds pressed');
  };
  
  return (
    <Container>
      <StatusBar style="auto" />
      <BalanceSection>
        <BalanceText>Balance: ${accountData.balance} USD</BalanceText>
        <AddFundsButton onPress={handleAddFunds}>
          <AddFundsButtonText>Add Funds</AddFundsButtonText>
        </AddFundsButton>
      </BalanceSection>
      <TransactionList transactions={accountData.transactions} />
    </Container>
  );
};

export default AccountScreen;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const BalanceSection = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const BalanceText = styled(GlobalText)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const AddFundsButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const AddFundsButtonText = styled(GlobalText)`
  color: white;
  font-size: 16px;
`;