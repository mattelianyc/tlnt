import React from 'react';
import { StatusBar, TouchableOpacity, FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';

// Mock data for balance and recent transactions
const accountData = {
  balance: 120.50, // USD
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

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const BalanceSection = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const BalanceText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const AddFundsButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const AddFundsButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const TransactionDetails = styled.View`
flex: 1;
`;

const TransactionDate = styled.Text`
font-size: 14px;
color: #aaa;
margin-left: 10px;
`;

const TransactionRow = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 15px;
border-bottom-width: 1px;
border-color: #eee;
`;

const TransactionDescription = styled.Text`
  font-size: 16px;
`;

const TransactionAmount = styled.Text`
  font-size: 16px;
  color: ${props => props.amount >= 0 ? 'green' : 'red'};
`;

const AccountScreen = () => {
  const handleAddFunds = () => {
    // Handle the add funds logic
    console.log('Add funds pressed');
  };

  const renderTransaction = ({ item }) => (
    <TransactionRow>
      <TransactionDetails>
        <TransactionDescription>{item.description}</TransactionDescription>
        <TransactionAmount amount={item.amount}>
          {item.amount >= 0 ? `+${item.amount}` : item.amount} USD
        </TransactionAmount>
      </TransactionDetails>
      <TransactionDate>{item.date}</TransactionDate>
    </TransactionRow>
  );

  return (
    <Container>
      <StatusBar style="auto" />
      <BalanceSection>
        <BalanceText>Balance: ${accountData.balance} USD</BalanceText>
        <AddFundsButton onPress={handleAddFunds}>
          <AddFundsButtonText>Add Funds</AddFundsButtonText>
        </AddFundsButton>
      </BalanceSection>
      <FlatList
        data={accountData.transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default AccountScreen;
