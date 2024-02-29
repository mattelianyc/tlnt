import React, { useEffect, useState } from 'react';
import { StatusBar, Alert, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountData } from '../redux/slices/accountSlice'; // Assuming this is correctly imported
import TransactionList from '../components/common/TransactionList';
import usePayment from '../hooks/usePayment'; // Assuming this is a custom hook for payment logic
import { GlobalText } from '../styles/StyledComponents';

const AccountScreen = () => {
  const [addAmount, setAddAmount] = useState('');
  const dispatch = useDispatch();
  const { balance, transactions } = useSelector((state) => state.account);
  const { user } = useSelector((state) => state.auth); // Correctly access the user object
  const { presentPayment } = usePayment();

  // Fetch account data when the component mounts or the user changes
  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchAccountData(user._id)); // Correctly pass the userId
      console.log('stayte    ::::      ', balance)
      console.log('stayte    ::::      ', transactions)
    }
  }, [dispatch, user]);

  const handleAddFunds = async () => {
    const { success, error } = await presentPayment(addAmount);
    if (success) {
      Alert.alert('Success', 'Payment successful');
      if (user && user._id) {
        dispatch(fetchAccountData(user._id)); // Refresh account data after adding funds
      }
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <BalanceSection>
        <BalanceText>Balance: ${balance ? balance.toFixed(2) : '0.00'} USD</BalanceText>
        <TextInput
          placeholder="Amount to add"
          value={addAmount}
          onChangeText={setAddAmount}
          keyboardType="numeric"
          style={{ backgroundColor: 'white', width: '80%', padding: 10, borderRadius: 5 }}
        />
        <AddFundsButton onPress={handleAddFunds}>
          <AddFundsButtonText>Add Funds</AddFundsButtonText>
        </AddFundsButton>
      </BalanceSection>
      <TransactionList transactions={transactions || []} />
    </Container>
  );
};

export default AccountScreen;

// Styled components remain the same
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
