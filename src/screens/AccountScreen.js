import React, { useState, useEffect } from 'react';
import { Alert, TextInput, Button, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Import Axios
import { fetchAccountData } from '../redux/slices/accountSlice';
import { useStripe } from '@stripe/stripe-react-native';
import TransactionList from '../components/common/TransactionList';
import { GlobalText } from '../styles/StyledComponents';

const AccountScreen = () => {
  const [addAmount, setAddAmount] = useState('');
  const dispatch = useDispatch();
  const { balance, transactions } = useSelector((state) => state.account);
  const { user } = useSelector((state) => state.auth);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchAccountData(user._id));
    }
  }, [dispatch, user]);

  const fetchClientSecret = async () => {
    try {
      // Use Axios to send a POST request
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/create-payment-intent`, {
        amount: parseInt(addAmount, 10) * 100, // Convert amount to cents and to a number
      });
      console.log('response ', response)
      // Axios automatically parses the JSON response, so you can directly access `data`
      const { clientSecret } = response.data;
      return clientSecret;
    } catch (error) {
      console.error('Error fetching client secret:', error);
      Alert.alert('Error', 'Unable to fetch payment information.');
    }
  };

  const handlePressAddFunds = async () => {
    const clientSecret = await fetchClientSecret();
    
    if (!clientSecret) {
      return; // Exit if we didn't get a client secret
    }

    // Initialize the payment sheet with the client secret
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Tlnt Corp.',
      returnURL: 'tlnt://redirect', // Use your custom URL scheme
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    // Present the payment sheet
    const { error: presentError } = await presentPaymentSheet();

    if (presentError) {
      Alert.alert('Error', presentError.message);
    } else {
      Alert.alert('Success', 'Payment successful');
      // Optionally, refresh the account data
      dispatch(fetchAccountData(user._id));
    }
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
        <AddFundsButton onPress={handlePressAddFunds}>
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
