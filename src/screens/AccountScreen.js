import React, { useState, useEffect } from 'react';
import { Alert, TextInput, Button, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountData, addFunds } from '../redux/slices/accountSlice';
import { useStripe } from '@stripe/stripe-react-native';
import TransactionList from '../components/common/TransactionList';
import { GlobalText } from '../styles/StyledComponents';
import axios from 'axios';

const AccountScreen = () => {
  const [addAmount, setAddAmount] = useState('');
  const dispatch = useDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { balance, transactions } = useSelector((state) => state.account);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchAccountData(user._id));
    }
  }, [dispatch, user]);

  // This function should be adjusted to correctly create a payment intent and fetch the clientSecret from your backend.
  const fetchClientSecretAndPresentPaymentSheet = async () => {
    try {
      // Adjust this request to match your backend endpoint for creating a payment intent
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/create-payment-intent`, {
        amount: parseInt(addAmount, 10) * 100, // Convert amount to cents
        userId: user._id, // Include user ID if necessary for your backend logic
      });

      const { clientSecret, paymentIntentId } = response.data;

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      const result = await presentPaymentSheet();
      if (result.error) {
        Alert.alert("Payment failed", result.error.message);
      } else {
        Alert.alert("Success", "Payment successful");
        // Dispatch action to record successful payment and refresh account data
        dispatch(addFunds({ userId: user._id, paymentIntentId, amount: parseFloat(addAmount) }));
        setAddAmount('');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      Alert.alert('Error', 'Failed to initiate payment');
    }
  };

  const handlePressAddFunds = () => {
    if (!addAmount) {
      Alert.alert('Error', 'Please enter an amount.');
      return;
    }
    fetchClientSecretAndPresentPaymentSheet();
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <BalanceSection>
        <BalanceText>Balance: ${balance.toFixed(2)} USD</BalanceText>
        <TextInput
          placeholder="Amount to add"
          value={addAmount}
          onChangeText={setAddAmount}
          keyboardType="numeric"
          style={{ backgroundColor: 'white', width: '80%', padding: 10, borderRadius: 5 }}
        />
        <Button title="Add Funds" onPress={handlePressAddFunds} />
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
