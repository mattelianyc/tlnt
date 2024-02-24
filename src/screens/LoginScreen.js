import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { loginUser } from '../redux/slices/authSlice'; // Adjust the import path as needed

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: 'Moirai';
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  margin-bottom: 10px;
  border-width: 1px;
  padding: 10px;
  border-radius: 5px;
`;

const Button = styled.TouchableOpacity`
  background-color: blue;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const LinkText = styled.Text`
  margin-top: 20px;
  color: blue;
  text-align: center;
`;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth); // Assuming your store is setup correctly with the auth slice

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleLogin} disabled={authState.isLoading}>
        <ButtonText>{authState.isLoading ? 'Logging In...' : 'Sign In'}</ButtonText>
      </Button>
      {authState.error && (
        <Text style={{ color: 'red', textAlign: 'center' }}>
          {authState.error.message || 'An error occurred. Please try again.'}
        </Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <LinkText>Don't have an account? Register</LinkText>
      </TouchableOpacity>
    </Container>
  );
};

export default LoginScreen;
